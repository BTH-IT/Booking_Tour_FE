import { useState } from 'react';
import * as Styles from './styles';
import { Col, Form, Input, Row, Select } from 'antd';
import { AiOutlineSearch } from 'react-icons/ai';
import CalendarInput from '@/components/CalendarInput';
import { CalendarChangeEvent } from 'primereact/calendar';
import useDidMount from '@/hooks/useDidMount';
import { IDestination } from 'destination';
import destinationService from '@/services/DestinationService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const SearchForm = () => {
  const [form] = Form.useForm();
  const [date, setDate] = useState<Date[]>([]);
  const [destinations, setDestinations] = useState<IDestination[]>([]);
  const navigate = useNavigate();

  async function handleFetchDestinations() {
    try {
      const data = await destinationService.getAllDestination();

      setDestinations(data);
    } catch {
      toast.error('Oops!! Something is wrong');
    }
  }

  useDidMount(() => {
    handleFetchDestinations();
  });

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
                      value: destination._id,
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
