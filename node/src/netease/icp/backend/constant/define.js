export const RecordType = {
    "RT_FIRST": 0,
    "RT_JOIN": 1,
    "RT_ADDSITE": 2
}

export const RecordCheckStatus = {
    "RS_DRAFT":0,
    "RS_TRIAL_CHECKING":1,
    "RS_TRIAL_NOPASS":2,
    "RS_TRIAL_PASS":3,
    "RS_PHOTO_CHECKING":4,
    "RS_PHOTO_NOPASS":5,
    "RS_PHOTO_PASS":6,
    "RS_COUNCIL_CHECKING":7,
    "RS_COUNCIL_NOPASS":8,
    "RS_COUNCIL_PASS":9
}

module.exports = {
    RecordCheckStatus: RecordCheckStatus,
    RecordType: RecordType
}