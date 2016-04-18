 const RecordType = {
    "RT_FIRST": 0,
    "RT_JOIN": 1,
    "RT_ADDSITE": 2
}

 const IDTYPE = {
     "DOMAIN":0,
    "QY_GSYYZZ":1,
    "GR_SFZ":2,
    "SY_ZZJGDMZ":3,
    "SY_FRZS":4,
    "JD_JDDH":5,
    "SFTT_STFRZS":6,
    "GR_HZ":7,
    "GR_JGZ":8,
    "ZFJG_ZZJGDMZS":9,
    "SFTT_ZZJGDMZS":10,
    "GR_TBZ":11,
    "QY_ZZJGDMZS":12
}

 const RecordCheckStatus = {
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

 /*
 CHECKEDLIST: 核验单不超过150K
 COMPANYIDSIZE: 单位有效证件类型不超过100K
 COMPANYOWNERSIZE:单位负责人有效证件不超过100K
 WEBSITEOWNERSIZE:网站负责人有效证件不超过100K
 CHECKLISTSIZE:当面核验单不超过100K
 * */
const PhotoSizeLimit = {
    "CHECKEDLISTSIZE": 150*1025,
    "COMPANYIDSIZE":100*1024,
    "COMPANYOWNERSIZE":100*1024,
    "WEBSITEOWNERSIZE":100*1024,
    "CHECKLISTSIZE":100*1024
}


module.exports = {
    RecordCheckStatus,
    RecordType,
    IDTYPE,
    PhotoSizeLimit
};