export interface DaDataCompanyResponse {
  suggestions: Suggestion[];
}

export interface Suggestion {
  value: string;
  unrestricted_value: string;
  data: SuggestionData;
}

export interface SuggestionData {
  kpp: string;
  capital: null;
  invalid: null;
  management: Management;
  fio: Fio;
  founders: null;
  managers: null;
  predecessors: null;
  successors: null;
  branch_type: string | null;
  branch_count: number;
  source: null;
  qc: null;
  hid: string;
  type: string | null;
  state: State;
  opf: Opf;
  name: Name;
  inn: string;
  ogrn: string;
  okpo: string;
  okato: string;
  oktmo: string;
  okogu: string;
  okfs: string;
  okved: string;
  okveds: null;
  authorities: null;
  documents: null;
  licenses: null;
  finance: Finance | null;
  address: Address;
  phones: null;
  emails: null;
  ogrn_date: number;
  okved_type: string;
  employee_count: null;
}

export interface Address {
  value: string;
  unrestricted_value: string;
  invalidity: null;
  data: AddressData;
}

export interface AddressData {
  postal_code: string;
  country: string | null;
  country_iso_code: string | null;
  federal_district: string | null;
  region_fias_id: string;
  region_kladr_id: string;
  region_iso_code: string | null;
  region_with_type: string | null;
  region_type: string | null;
  region_type_full: string | null;
  region: string | null;
  area_fias_id: null | string;
  area_kladr_id: null | string;
  area_with_type: string | null;
  area_type: string | null;
  area_type_full: string | null;
  area: string | null;
  city_fias_id: string;
  city_kladr_id: string;
  city_with_type: string | null;
  city_type: string | null;
  city_type_full: string | null;
  city: string | null;
  city_area: null | string;
  city_district_fias_id: null;
  city_district_kladr_id: null;
  city_district_with_type: null | string;
  city_district_type: null | string;
  city_district_type_full: null | string;
  city_district: null | string;
  settlement_fias_id: null;
  settlement_kladr_id: null;
  settlement_with_type: null;
  settlement_type: null;
  settlement_type_full: null;
  settlement: null;
  street_fias_id: string;
  street_kladr_id: string;
  street_with_type: string;
  street_type: string;
  street_type_full: string;
  street: string;
  stead_fias_id: null;
  stead_cadnum: null;
  stead_type: null;
  stead_type_full: null;
  stead: null;
  house_fias_id: string;
  house_kladr_id: string;
  house_cadnum: null | string;
  house_flat_count: null;
  house_type: string | null;
  house_type_full: string | null;
  house: string;
  block_type: null | string;
  block_type_full: null | string;
  block: null | string;
  entrance: null;
  floor: null | string;
  flat_fias_id: null;
  flat_cadnum: null;
  flat_type: null | string;
  flat_type_full: null | string;
  flat: null | string;
  flat_area: string;
  square_meter_price: string;
  flat_price: null;
  room_fias_id: null;
  room_cadnum: null;
  room_type: null;
  room_type_full: null;
  room: null | string;
  postal_box: null;
  fias_id: string;
  fias_code: string;
  fias_level: string;
  fias_actuality_state: string;
  kladr_id: string;
  geoname_id: string;
  capital_marker: string;
  okato: string;
  oktmo: string;
  tax_office: string;
  tax_office_legal: string;
  timezone: string | null;
  geo_lat: string;
  geo_lon: string;
  beltway_hit: string | null;
  beltway_distance: null | string;
  metro: Metro[];
  divisions: null;
  qc_geo: string;
  qc_complete: null;
  qc_house: null;
  history_values: null;
  unparsed_parts: null;
  source: string;
  qc: string;
}

export interface Metro {
  name: string;
  line: string;
  distance: number;
}

export interface Finance {
  tax_system: null;
  income: null;
  expense: null;
  revenue: null;
  debt: null;
  penalty: null;
  year: null;
}

export interface Management {
  name: string;
  post: string | null;
  disqualified: null;
}

export interface Fio {
  surname: string;
  name: string;
  patronymic: string;
  gender: string;
  source: string;
  qc: string;
}

export interface Name {
  full_with_opf: string;
  short_with_opf: string;
  latin: null;
  full: string;
  short: string;
}

export interface Opf {
  type: string;
  code: string;
  full: string | null;
  short: string | null;
}

export interface State {
  status: Status;
  code: null;
  actuality_date: number;
  registration_date: number;
  liquidation_date: null;
}

export type Status =
  | "ACTIVE"
  | "LIQUIDATING"
  | "LIQUIDATED"
  | "REORGANIZING"
  | "BANKRUPT";
