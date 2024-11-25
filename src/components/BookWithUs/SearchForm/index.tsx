import { Col, Form, Input, Row, Select } from 'antd';
import { IDestination } from 'destination';
import { CalendarChangeEvent } from 'primereact/calendar';
import { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useNavigate } from 'react-router';

import * as Styles from './styles';

import CalendarInput from '@/components/CalendarInput';
import useDidMount from '@/hooks/useDidMount';
import useSignalR from '@/hooks/useSignalR';
import destinationService from '@/services/DestinationService';
import { logError } from '@/utils/constants';

const SearchForm = () => {
  const signalDestination = useSignalR('DestinationEvent');

  const [form] = Form.useForm();
  const [date, setDate] = useState<Date[]>([]);
  const [destinations, setDestinations] = useState<IDestination[]>([]);
  const navigate = useNavigate();

  async function handleFetchDestinations() {
    try {
      const res = await destinationService.getAllDestinations();

      setDestinations(res.result);
    } catch (error) {
      logError(error);
    }
  }

  useDidMount(() => {
    handleFetchDestinations();
  });

  useEffect(() => {
    if (signalDestination) {
      setDestinations((prev) => {
        switch (signalDestination.type) {
          case 'CREATE':
            return [signalDestination.data, ...prev];
          case 'UPDATE':
            return prev.map((tour) =>
              tour.id === signalDestination.data.id
                ? signalDestination.data
                : tour
            );
          case 'DELETE':
            return prev.filter((tour) => tour.id !== signalDestination.data.id);
          default:
            return prev;
        }
      });
    }
  }, [signalDestination]);

  const onFinish = (values: any) => {
    let state = {};
    for (const key in values) {
      if (values[key]) {
        if (key === 'duration') {
          if (values[key][1] === null) {
            state = {
              ...state,
              dateFrom: values[key][0].getTime(),
              dateTo: new Date().getTime(),
            };
          } else {
            state = {
              ...state,
              dateFrom: values[key][0].getTime(),
              dateTo: values[key][1].getTime(),
            };
          }

          continue;
        }

        state = {
          ...state,
          [key]: values[key],
        };
      }
    }

    navigate('/search?' + new URLSearchParams(state).toString());
  };

  return (
    <Styles.SearchFormWrapper
      form={form}
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
    >
      <Row gutter={20}>
        <Col xs={24} md={18}>
          <Styles.SearchFormContent gutter={20}>
            <Col xs={24} md={8}>
              <Form.Item name="search" label="Keyword">
                <Input placeholder="Enter your keyword..." bordered={false} />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item name="destination" label="Destination">
                <Select
                  size="middle"
                  options={destinations.map((destination) => {
                    return {
                      label: destination.name,
                      value: destination.id,
                    };
                  })}
                  bordered={false}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item name="duration" label="Duration">
                <CalendarInput
                  hasIcon={false}
                  value={date}
                  onChange={(e: CalendarChangeEvent) =>
                    setDate(e.value as Date[])
                  }
                  minDate={new Date()}
                  selectionMode="range"
                  numberOfMonths={2}
                />
              </Form.Item>
            </Col>
          </Styles.SearchFormContent>
        </Col>
        <Col xs={24} md={6}>
          <Styles.SearchFormButton
            type="primary"
            htmlType="submit"
            icon={<AiOutlineSearch />}
          >
            Search
          </Styles.SearchFormButton>
        </Col>
      </Row>
    </Styles.SearchFormWrapper>
  );
};

export default SearchForm;
