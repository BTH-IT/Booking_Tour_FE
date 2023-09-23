import React from 'react';
import * as Styles from './styles';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchForm = () => {
  const [form] = Form.useForm();

  const onFinish = () => {};

  const onFinishFailed = () => {};

  const onFill = () => {};

  return (
    <Styles.SearchFormWrapper
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Row gutter={20}>
        <Col xs={20}>
          <Styles.SearchFormContent gutter={20}>
            <Col xs={8}>
              <Form.Item name="keyword" label="Keyword">
                <Input placeholder="Enter your keyword..." bordered={false} />
              </Form.Item>
            </Col>
            <Col xs={8}>
              <Form.Item name="destination" label="Destination">
                <Select size="middle" options={[]} bordered={false} />
              </Form.Item>
            </Col>
            <Col xs={8}>
              <Form.Item name="duration" label="Duration">
                <Select size="middle" options={[]} bordered={false} />
              </Form.Item>
            </Col>
          </Styles.SearchFormContent>
        </Col>
        <Col xs={4}>
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
