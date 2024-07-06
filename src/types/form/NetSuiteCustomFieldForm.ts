import type {ValueOf} from 'type-fest';
import type CONST from '@src/CONST';
import type Form from './Form';

const INPUT_IDS = {
    INTERNAL_ID: 'internalID',
    MAPPING: 'mapping',
    LIST_NAME: 'listName',
    SEGMENT_NAME: 'segmentName',
    TRANSACTION_FIELD_ID: 'transactionFieldID',
    SCRIPT_ID: 'scriptID',
    CUSTOM_SEGMENT_TYPE: 'customSegmentType',
} as const;

type InputID = ValueOf<typeof INPUT_IDS>;

type NetSuiteCustomFieldForm = Form<
    InputID,
    {
        [INPUT_IDS.INTERNAL_ID]: string;
        [INPUT_IDS.MAPPING]: string;
        [INPUT_IDS.LIST_NAME]: string;
        [INPUT_IDS.SEGMENT_NAME]: string;
        [INPUT_IDS.TRANSACTION_FIELD_ID]: string;
        [INPUT_IDS.SCRIPT_ID]: string;
        [INPUT_IDS.CUSTOM_SEGMENT_TYPE]: ValueOf<typeof CONST.NETSUITE_CUSTOM_RECORD_TYPES>;
    }
>;

export type {NetSuiteCustomFieldForm};
export default INPUT_IDS;
