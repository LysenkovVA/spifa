"use client";

import {
  Col,
  DatePicker,
  Flex,
  Form,
  FormInstance,
  Input,
  Result,
  Row,
  Segmented,
  Select,
  Tabs,
  TabsProps,
} from "antd";
import { Company } from "@/entities/Company";
import { useCallback, useEffect, useState } from "react";
import { ValidateErrorEntity } from "rc-field-form/es/interface";
import { BankOutlined, SmileOutlined, UserOutlined } from "@ant-design/icons";
import { DigitInput } from "@/shared/UI/DigitInput";
import dayjs from "dayjs";
import ru_RU from "antd/lib/locale/ru_RU";
import { SVGImage } from "@/shared/UI/SVGImage";
import BillSvg from "@/shared/assets/svg/bill.svg";
import BindedFRCSvg from "@/shared/assets/svg/BindedFRC.svg";
import CompanyDetailsSvg from "@/shared/assets/svg/CompanyDetails.svg";
import ContactsSvg from "@/shared/assets/svg/Contacts.svg";
import { CompanyNameInputWithSearch } from "@/features/Companies/CompanyNameInputWithSearch";
import { Suggestion } from "@/entities/Company/model/types/DaDataCompanyInterfaces";
import SearchableInnOrKppDigitInput from "@/features/Companies/SearchableINNDigitInput/ui/SearchableInnOrKppDigitInput";
import useModal from "antd/es/modal/useModal";

export interface CompanyFormProps {
  form?: FormInstance;
  initialValues?: Company;
  onFinish?: (company: Company) => void;
  onFinishFailed?:
    | ((errorInfo: ValidateErrorEntity<Company>) => void)
    | undefined;
  onValuesChange?: (values: Company) => void;
}

const CompanyForm = (props: CompanyFormProps) => {
  const { form, initialValues, onFinish, onFinishFailed, onValuesChange } =
    props;

  const [innLength, setInnLength] = useState<number>(10);
  const [showIP, setShowIP] = useState<boolean>(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [modalApi, context] = useModal();

  useEffect(() => {
    form?.setFieldsValue(initialValues);
  }, [form, initialValues]);

  /**
   * Функция заполнения полей по выбранному названию
   */
  const onSelectChangedCompanyName = useCallback(
    (value: Suggestion | undefined) => {
      if (value) {
        modalApi.confirm({
          title: `Заполнить поля для компании ${value?.value}?`,
          centered: true,
          onClose: () => {
            return;
          },
          onOk: () => {
            form?.setFieldValue(["name"], value.value);
            form?.setFieldValue(["type"], value.data.type);

            switch (value.data.type) {
              case "LEGAL":
                form?.setFieldValue(["management"], value.data.management.name);
                form?.setFieldValue(["fio"], null);
                setShowIP(false);
                setInnLength(10);
                break;

              case "INDIVIDUAL":
                form?.setFieldValue(["management"], null);
                form?.setFieldValue(
                  ["fio"],
                  `${value.data.fio.surname ?? ""} ${value.data.fio.name ?? ""} ${value.data.fio.patronymic ?? ""}`.trim(),
                );
                setShowIP(true);
                setInnLength(12);
                break;
            }

            form?.setFieldValue(["opf"], value.data.opf.full);
            form?.setFieldValue(["phone"], value.data.phones);
            form?.setFieldValue(["address"], value.data.address.value);
            form?.setFieldValue(["status"], value.data.state.status);
            form?.setFieldValue(["inn"], value.data.inn);
            form?.setFieldValue(["kpp"], value.data.kpp);
            form?.setFieldValue(["ogrn"], value.data.ogrn);
            form?.setFieldValue(["ogrnDate"], value.data.ogrn_date);
            form?.setFieldValue(["okato"], value.data.okato);
            form?.setFieldValue(["okpo"], value.data.okpo);
            form?.setFieldValue(["okfs"], value.data.okfs);
            form?.setFieldValue(["oktmo"], value.data.oktmo);
            form?.setFieldValue(["okogu"], value.data.okogu);
            form?.setFieldValue(["okved"], value.data.okved);
            form?.setFieldValue(
              ["actualityDate"],
              value.data.state.actuality_date,
            );
            form?.setFieldValue(
              ["registrationDate"],
              value.data.state.registration_date,
            );
            form?.setFieldValue(
              ["liquidationDate"],
              value.data.state.liquidation_date,
            );
          },
        });
      }
    },
    [form, modalApi],
  );

  // Основные реквизиты (контент)
  const detailsContent = (
    <>
      <Row gutter={8} align={"top"} justify={"start"}>
        <Col span={12}>
          <Form.Item
            name={"inn"}
            label={"ИНН"}
            rules={[{ required: true, message: "Не указан ИНН" }]}
          >
            {/*<DigitInput length={innLength} />*/}
            <SearchableInnOrKppDigitInput
              digitsCount={innLength}
              onGetSearchResult={onSelectChangedCompanyName}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={"kpp"} label={"КПП"}>
            <DigitInput length={9} />
            {/*<SearchableInnOrKppDigitInput*/}
            {/*  digitsCount={9}*/}
            {/*  onGetSearchResult={onSelectChangedCompanyName}*/}
            {/*/>*/}
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={8} align={"top"} justify={"start"}>
        <Col span={12}>
          <Form.Item name={"ogrn"} label={"ОГРН"}>
            <DigitInput length={13} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name={"ogrnDate"}
            label={"Дата выдачи ОГРН"}
            getValueProps={(value) => ({
              value: value && dayjs(value),
            })}
            normalize={(value) => value && `${dayjs(value).valueOf()}`}
          >
            <DatePicker
              placeholder="Укажите дату"
              format={"DD.MM.YYYY"}
              locale={ru_RU.DatePicker}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={12}>
          <Form.Item name={"okato"} label={"ОКАТО"}>
            <DigitInput length={11} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={"okpo"} label={"ОКПО"}>
            <DigitInput length={10} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={2}>
          <Form.Item name={"okfs"} label={"ОКФС"}>
            <DigitInput length={2} />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item name={"oktmo"} label={"ОКТМО"}>
            <DigitInput length={11} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name={"okogu"} label={"ОКОГУ"}>
            <DigitInput length={3} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name={"okved"} label={"ОКВЭД"}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </>
  );

  // Привязанные центры финансовой ответственности (контент)
  const frcContent = (
    <Result icon={<SmileOutlined />} title="Привязанные ЦФО" />
  );

  // Счета компании (контент)
  const companyBillsContent = (
    <Result icon={<SmileOutlined />} title="Счета компании" />
  );

  const contactsContent = (
    <>
      <Form.Item hidden={!showIP} name={"fio"} label={"ФИО ИП"}>
        <Input placeholder={"Укажите ФИО ИП"} />
      </Form.Item>
      <Form.Item hidden={showIP} name={"management"} label={"Руководитель"}>
        <Input placeholder={"Укажите руководителя"} />
      </Form.Item>
      <Form.Item name={"address"} label={"Адрес"}>
        <Input placeholder={"Укажите адрес"} />
      </Form.Item>
      <Form.Item name={"phone"} label={"Телефон"}>
        <Input placeholder={"Укажите телефон"} />
      </Form.Item>
    </>
  );

  const tabsContent = () => {
    const tabItems: TabsProps["items"] = [
      {
        label: (
          <Flex align={"center"} justify={"center"} gap={4}>
            <SVGImage SVG={CompanyDetailsSvg} width={20} height={20} />{" "}
            {"Основные реквизиты"}
          </Flex>
        ),
        key: "1",
        children: detailsContent,
      },
      {
        label: (
          <Flex align={"center"} justify={"center"} gap={4}>
            <SVGImage SVG={BindedFRCSvg} width={20} height={20} />{" "}
            {"Привязанные ЦФО"}
          </Flex>
        ),
        key: "2",
        children: frcContent,
      },
      {
        label: (
          <Flex align={"center"} justify={"center"} gap={4}>
            <SVGImage SVG={BillSvg} width={20} height={20} /> {"Счета компании"}
          </Flex>
        ),
        key: "3",
        children: <Result icon={<SmileOutlined />} title="Счета компании" />,
      },
      {
        label: (
          <Flex align={"center"} justify={"center"} gap={4}>
            <SVGImage SVG={ContactsSvg} width={20} height={20} /> {"Контакты"}
          </Flex>
        ),
        key: "4",
        children: contactsContent,
      },
    ];

    return <Tabs size={"large"} items={tabItems} />;
  };

  return (
    <Form
      id={"companyForm"}
      layout="vertical"
      colon={false}
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      onValuesChange={(changedValues, values) => {
        console.log("form values", JSON.stringify(values, null, 2));
        onValuesChange?.(form?.getFieldsValue());
      }}
      clearOnDestroy={true}
      style={{
        padding: "0 16px",
      }}
    >
      {context}
      {/*НАЗВАНИЕ*/}
      <Form.Item
        name={"name"}
        label={"Название"}
        rules={[{ required: true, message: "Не указано название" }]}
      >
        <CompanyNameInputWithSearch
          placeholder={"Укажите название"}
          onSelectSearchResult={onSelectChangedCompanyName}
        />
      </Form.Item>
      <Row gutter={8} align={"top"} justify={"start"}>
        <Col span={12}>
          <Form.Item
            label={"Тип компании"}
            name={"type"}
            initialValue={"LEGAL"}
          >
            <Segmented
              vertical
              style={{ width: "100%" }}
              options={[
                {
                  value: "LEGAL",
                  label: "Юридическое лицо",
                  icon: <BankOutlined />,
                },
                {
                  value: "INDIVIDUAL",
                  label: "Индивидуальный предприниматель",
                  icon: <UserOutlined />,
                },
              ]}
              onChange={(value) => {
                switch (value) {
                  case "LEGAL":
                    setInnLength(10);
                    setShowIP(false);
                    break;
                  case "INDIVIDUAL":
                    setInnLength(12);
                    setShowIP(true);
                    break;

                  default:
                    setInnLength(5);
                    setShowIP(false);
                    break;
                }
              }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          {/*СТАТУС*/}
          <Form.Item name={"status"} label={"Статус"}>
            <Select
              placeholder={"Укажите статус"}
              options={[
                { value: "ACTIVE", label: "Действующая" },
                { value: "LIQUIDATING", label: "Ликвидируется" },
                { value: "LIQUIDATED", label: "Ликвидирована" },
                {
                  value: "REORGANIZING",
                  label:
                    "В процессе присоединения к другому юрлицу, с последующей ликвидацией",
                },
                { value: "BANKRUPT", label: "Банкрот" },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={8} align={"middle"} justify={"start"}>
        <Col span={12}>
          {/*ОПФ*/}
          <Form.Item name={"opf"} label={"ОПФ"}>
            <Input placeholder={"Укажите ОПФ"} />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item
            name={"actualityDate"}
            label={"Дата последних изменений"}
            getValueProps={(value) => ({
              value: value && dayjs(value),
            })}
            normalize={(value) => value && `${dayjs(value).valueOf()}`}
          >
            <DatePicker
              placeholder="Укажите дату"
              format={"DD.MM.YYYY"}
              locale={ru_RU.DatePicker}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item
            name={"registrationDate"}
            label={"Дата регистрации"}
            getValueProps={(value) => ({
              value: value && dayjs(value),
            })}
            normalize={(value) => value && `${dayjs(value).valueOf()}`}
          >
            <DatePicker
              placeholder="Укажите дату"
              format={"DD.MM.YYYY"}
              locale={ru_RU.DatePicker}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item
            name={"liquidationDate"}
            label={"Дата ликвидации"}
            getValueProps={(value) => ({
              value: value && dayjs(value),
            })}
            normalize={(value) => value && `${dayjs(value).valueOf()}`}
          >
            <DatePicker
              placeholder="Укажите дату"
              format={"DD.MM.YYYY"}
              locale={ru_RU.DatePicker}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
      </Row>
      {tabsContent()}
    </Form>
  );
};

export default CompanyForm;
