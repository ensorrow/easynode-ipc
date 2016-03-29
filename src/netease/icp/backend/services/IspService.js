var assert = require('assert');
var logger = using('easynode.framework.Logger').forFile(__filename);
var GenericObject = using('easynode.GenericObject');
var md5 =  require('md5');
var fs = require('co-fs');
var f =  require('fs');
var bfs = require('babel-fs');
var archiver = require('archiver');
var _ = require('lodash');
var soap = require('soap');

(function () {
    const ISPID = 110000000211;
    const PASSWORD = 'a11111';
    const KEY = 'XRDRUE7FFCRE1T7I';
    const OFFSET = '7VU2H0LLBG8373LK';
    const SEQ = 1;

    const REPORT_URL = 'http://122.224.213.98/ISPWebService/upDownLoad?wsdl';
    const QUERY_URL = 'http://122.224.213.98/BeianStatusWebService/queryBeianStatus?wsdl';
    const VERIFY_URL = 'http://zcaisp.miitbeian.gov.cn/BeianStatusWebService/verifyBamm?wsdl';

    const URLS = [REPORT_URL,QUERY_URL,VERIFY_URL];
        /**
     * Class IspService
     *
     * @class netease.icp.backend.services.IspService
     * @extends easynode.GenericObject
     * @since 0.1.0
     * @author allen.hu
     * */
    class IspService extends GenericObject {
        /**
         * 构造函数。
         *
         * @method 构造函数
         * @since 0.1.0
         * @author allen.hu
         * */
        constructor(app) {
            super();
            //调用super()后再定义子类成员。
            this.app = app;
            this.clientReport = null;
            this.clientQuery = null;
            this.clientVerify = null;
        }

        /**
         * @method createConnect 创建连接
         * @since 0.1.0

         * @apiSuccess {Promise[]}
         *
         */
        createConnect(){
            var me = this;
            var ps  = URLS.map( (url)=> {
                return new Promise(function (res, rej) {
                    soap.createClient(REPORT_URL, function (err, client) {
                        if (err) {
                            EasyNode.DEBUG && logger.debug(`createConnect to ${url} failed`);
                            rej();
                        } else {
                             url == REPORT_URL ? me.clientReport = client :
                             url == QUERY_URL ? me.clientQuery = client : me.clientVerify = client;
                            EasyNode.DEBUG && logger.debug(`createConnect to ${url} success`);
                            res();
                        }
                    });
                });
            });

            return Promise.all(ps);
        }

        /**
         * @method 上报数据
         * @apiName isp_upload
         * @apiGroup ISP
         * @apiPermission whitelist
         * @apiVersion 0.0.2
         *
         * @apiDescription 该方法实现将企业侧系统的备案申请等数据提交到部级系统、省局系统
         *
         * 企业侧系统在调用该接口方法之前，首先要产生长度为20个字节的随机字符串（数字和大、小写字母），并将口令与该随机字符串连接（例如，口令是字符串“1234567890”，生成的随机字符串是 “abcdefghij”，那么连接后的结果是字符串“1234567890abcdefghij”）。
         * 将连接后的结果转换为GBK编码的二进制数据，使用hashAlgorithm定义的哈希算法进行哈希计算，得到参数pwdHash的值作为认证信息。
         企业侧系统在调用该方法上报备案数据时，一次调用只能上报一个XML格式的数据文件，并且所上报的XML数据文件大小不能超过50MB，单个XML数据文件内的备案数据不能超过1000条。企业侧系统上报的数据文件必须满足本规范所附的XSD格式规范。
         企业侧系统上报的数据文件名必须使用英文字母或数字，文件名长度不超过128个字节。
         企业侧系统在上报完数据文件后，应保存该数据文件3个月以上，以保证系统处理文件出现错误时重新上传数据文件。
         企业侧系统要对需要上报的备案信息按照附件“企业上报数据格式.xsd”指定的格式编制XML文件，然后依序进行如下处理：
         1）	对XML文件使用参数compressionFormat指定的压缩格式进行压缩；
         2）	对压缩后的信息使用参数hashAlgorithm指定的哈希算法计算哈希值，并对哈希值进行base64编码运算形成beianInfoHash；
         3）	如需加密上传，则对压缩后的信息使用参数encryptAlgorithm指定的加密算法加密，并对加密结果进行base64编码运算形成beianInfo；如不加密上传，则直接对压缩后的信息进行base64编码运算形成beianInfo。


         * @apiParam {Number} ispId 接入服务提供者的标识，可在部/省局系统的公共查询中查询得到
         * @apiParam {String} userName 用户名，由企业所在省管局（或部管局）维护管理
         * @apiParam {String} randVal 企业侧系统调用该方法时生成的随机字符串，长度是20字节
         * @apiParam {String} pwdHash 使用指定的哈希算法对用户密码和随机字符串进行哈希运算，然后进行base64编码运算得到的结果，用户口令由企业所在省管局（或部管局）维护管理
         * @apiParam {String} beianInfo 对备案信息（XML文件，格式参见“企业上报数据格式.xsd”）使用压缩算法进行压缩，再对压缩后的信息进行加密，然后进行Base64编码运算得到的结果
         * @apiParam {String} beianInfoHash 对备案信息（XML文件，格式参见“企业上报数据格式.xsd”）压缩后进行哈希运算得到的哈希值
         * @apiParam {Number} dataSequence 本次数据上报的数据编号
         * @apiParam {Number} encryptAlgorithm 本次数据上报的数据编号 0: 不进行加密,明文转输 1:AES加密算法，加密模式使用CBC模式，补码方式采用PKCS5Padding，密钥偏移量由部级系统、省局系统生成的字符串，如“0102030405060708”。
         * @apiParam {Number} hashAlgorithm 哈希算法 0: MD5哈希算法
         * @apiParam {Number} compressionFormat 压缩格式 0: Zip压缩算法
         *
         * @apiSuccess {XML}
         *
         * 该方法返回一个XML数据流（数据格式详见文件“企业上报数据方法调用返回数据格式.xsd”），其中描述了本次操作的结果代码、结果描述。
             如果操作成功，则返回以下信息：
                <return>
                    <msg_code>0</msg_code>
                    <msg>操作成功</msg>
                </return>
         * @apiError {XML}
         * 如果操作错误，则返回以下信息：
             <return>
             <msg_code>x</msg_code>
             <msg>错误描述</msg>
             <dataSequences>（本标签当x=14时存在）
             <dataSequence>漏报的数据文件序号</dataSequence>
             </dataSequences>
             </return>
             msg_code参见第3-4节的接口返回状态msg_code代码表
         */
        isp_upload(){

        }

        /**
         * @method 下载数据
         * @apiName isp_download
         * @apiGroup ISP
         * @apiPermission whitelist
         * @apiVersion 0.0.2
         *
         * @apiDescription 通过该方法，企业侧系统可以下载部级系统或省管局系统下发的备案管理数据文件。
         *
         * 企业侧系统在调用该接口方法之前，首先要产生长度为20个字节的随机字符串（数字和大、小写字母），并将口令与该随机字符串连接（例如，口令是字符串“1234567890”，生成的随机字符串是 “abcdefghij”，那么连接后的结果是字符串“1234567890abcdefghij”）。将连接后的结果转换为GBK编码的二进制数据，使用hashAlgorithm定义的哈希算法进行哈希计算，得到参数pwdHash的值作为认证信息。
         部级系统或省局系统接收到企业侧系统的下载请求后，将需要下发给该企业的备案管理数据文件（文件格式参见“企业下载数据格式.xsd”）依次进行如下处理：
         1）	对XML数据文件使用指定的压缩格式进行压缩；
         2）	对压缩后的信息使用哈希算法计算哈希值，然后对哈希值进行base64编码运算；
         3）	如需加密下载，则对压缩后的信息使用指定的加密算法加密，然后对加密结果进行base64编码运算；如不加密下载，则直接对压缩后的信息进行base64编码运算形成beianInfo。
         部级系统或省局系统将上述处理后的哈希值、编码运算后的加密（或者明文）结果、哈希算法、加密算法、压缩格式返回给企业系统（详见“企业下载数据格式.xsd”）


         返回数据处理
         注：
         1.	返回值XML流中的标签“encryptAlgorithm”为0时，表示“beianInfo”标签的内容是不加密的；为1时，表示“beianInfo”标签的内容经过AES加密算法的加密，加密模式使用CBC模式，补码方式采用PKCS5Padding，密钥偏移量由部级系统、省局系统生成的字符串，如“0102030405060708”；
         2.	返回值XML流中的标签“hashAlgorithm”为0时，表示哈希算法是MD5；
         3.	返回值XML流中的标签“compressionFormat”为0时，表示使用Zip压缩格式进行压缩；
         4.	本方法中数据加解密、计算哈希值和压缩/解压缩是指对数据字节流的加解密、计算哈希值和压缩/解压缩。


         * @apiParam {Number} ispId 接入服务提供者的标识，可在部/省局系统的公共查询中查询得到
         * @apiParam {String} userName 用户名，由企业所在省管局（或部管局）维护管理
         * @apiParam {String} randVal 企业侧系统调用该方法时生成的随机字符串，长度是20字节
         * @apiParam {String} pwdHash 使用指定的哈希算法对用户密码和随机字符串进行哈希运算，然后进行base64编码运算得到的结果，用户口令由企业所在省管局（或部管局）维护管理
         * @apiParam {Number} hashAlgorithm 哈希算法 0: MD5哈希算法
         *
         * @apiSuccess {XML}
         *
         * 该方法返回一个XML数据流（数据格式详见文件“企业下载数据方法调用返回数据格式.xsd”），其中描述了本次操作的结果代码、结果描述。
         如果成功，返回以下信息：
         <return>
         <msg_code>0</msg_code>
         <msg>操作成功</msg>
         <fileInfos>
         <hashAlgorithm>哈希算法</hashAlgorithm>
         <compressionFormat>压缩格式</compressionFormat>
         <encryptAlgorithm>加密算法</encryptAlgorithm>
         <return_FileName>省局系统的备案数据文件名</return_FileName>
         <beianInfo>备案信息内容</beianInfo>
         <beianInfoHash>备案信息的哈希值</beianInfoHash>
         </fileInfos>
         </return>

         企业侧系统收到上述数据后，首先对beianInfo信息进行base64解码，接着对解码后的信息使用encryptAlgorithm指定的加密算法解密，在得到备案信息的压缩信息后，再使用hashAlgorithm指定的哈希算法计算哈希值，然后与beianInfoHash信息base64解码后的信息进行比较。如果比较一致，那么备案信息的完整性得到保证；如果比较不一致，则哈希值验证未通过，备案数据不完整。最后，在通过完整性校验后，使用compressionFormat指定的压缩格式对压缩后的信息进行解压缩，得到备案数据信息。
         如果操作错误，返回以下信息：
         <return>
         <msg_code>x</msg_code>
         <msg>错误描述</msg>
         </return>
         企业侧系统收到备案信息文件后，如果数据文件可以通过完整性校验，并进行解压缩，则应该调用本接口规范中第3-3-3节的“isp_downloadack”方法，将已正确接收到该文件的信息回执发送给部级系统或省局系统。
         msg_code参见第3-4节的接口返回状态msg_code代码表。
         对于部级系统或省局系统处理企业上报的备案数据文件所产生的错误信息，均以数据文件下载形式返回给企业。数据中的错误信息详见3-5节数据处理结果代码表。
         */
        isp_download(){

        }

        /**
         * @method 下载确认数据包
         * @apiName isp_downloadack
         * @apiGroup ISP
         * @apiPermission whitelist
         * @apiVersion 0.0.2
         *
         * @apiDescription 企业侧系统在调用isp_download方法，成功下载备案管理数据文件完毕后，需要调用本方法，将已成功接收到下载文件的信息回执发送给部级系统或省局系统。
         *
         * 注：
         1.	如果企业侧系统在调用isp_download方法成功下载备案管理数据文件完毕后，不调用本方法将已成功接收到数据文件的信息回执发送给部级系统/省局系统，则部级系统/省局系统将在企业侧系统再次调用isp_download方法时，继续发送该数据文件。
         2.	本方法中计算哈希值是指对数据字节流的哈希值计算。


         * 企业侧系统在调用该接口方法之前，首先要产生长度为20个字节的随机字符串（数字和大、小写字母），并将口令与该随机字符串连接（例如，口令是字符串“1234567890”，生成的随机字符串是 “abcdefghij”，那么连接后的结果是字符串“1234567890abcdefghij”）。将连接后的结果转换为GBK编码的二进制数据，使用hashAlgorithm定义的哈希算法进行哈希计算，得到参数pwdHash的值作为认证信息。
         部级系统或省局系统接收到企业侧系统的下载请求后，将需要下发给该企业的备案管理数据文件（文件格式参见“企业下载数据格式.xsd”）依次进行如下处理：
         1）	对XML数据文件使用指定的压缩格式进行压缩；
         2）	对压缩后的信息使用哈希算法计算哈希值，然后对哈希值进行base64编码运算；
         3）	如需加密下载，则对压缩后的信息使用指定的加密算法加密，然后对加密结果进行base64编码运算；如不加密下载，则直接对压缩后的信息进行base64编码运算形成beianInfo。
         部级系统或省局系统将上述处理后的哈希值、编码运算后的加密（或者明文）结果、哈希算法、加密算法、压缩格式返回给企业系统（详见“企业下载数据格式.xsd”）


         返回数据处理
         注：
         1.	返回值XML流中的标签“encryptAlgorithm”为0时，表示“beianInfo”标签的内容是不加密的；为1时，表示“beianInfo”标签的内容经过AES加密算法的加密，加密模式使用CBC模式，补码方式采用PKCS5Padding，密钥偏移量由部级系统、省局系统生成的字符串，如“0102030405060708”；
         2.	返回值XML流中的标签“hashAlgorithm”为0时，表示哈希算法是MD5；
         3.	返回值XML流中的标签“compressionFormat”为0时，表示使用Zip压缩格式进行压缩；
         4.	本方法中数据加解密、计算哈希值和压缩/解压缩是指对数据字节流的加解密、计算哈希值和压缩/解压缩。


         * @apiParam {Number} ispId 接入服务提供者的标识，可在部/省局系统的公共查询中查询得到
         * @apiParam {String} userName 用户名，由企业所在省管局（或部管局）维护管理
         * @apiParam {String} randVal 企业侧系统调用该方法时生成的随机字符串，长度是20字节
         * @apiParam {String} pwdHash 使用指定的哈希算法对用户密码和随机字符串进行哈希运算，然后进行base64编码运算得到的结果，用户口令由企业所在省管局（或部管局）维护管理
         * @apiParam {Number} hashAlgorithm 哈希算法 0: MD5哈希算法
         * @apiParam {String} fileName  在isp_download方法中已成功接收到的备案信息文件名
         *
         * @apiSuccess {XML}
         *
         *该方法返回一个XML数据流（详见文件“企业数据下载确认方法调用返回数据格式.xsd”），参照以下信息：
         <return>
         <msg_code>x</msg_code>
         <msg>返回信息描述</msg>
         </return>
         msg_code参见第3-4节的返回状态msg_code代码表
         */
        isp_downloadack(){

        }


        /**
         * @method 查询本企业最近一次上报备案数据及其序号
         * @apiName isp_querypreviousupload
         * @apiGroup ISP
         * @apiPermission whitelist
         * @apiVersion 0.0.2
         *
         * @apiDescription 查询本企业最近一次上报的备案数据及其序号。
         *
         注：
         1.	本方法在企业侧系统出现故障后，可以使用本方法与部级系统或省局系统进行通信参数的同步；企业侧系统在调用本方法得到数据文件序号后，在下次上报数据文件时，使用的文件序号应为本方法返回的数据文件序号加1；
         2.	企业侧系统在未进行数据上报操作时，调用本方法返回的数据文件为空，文件序号为0。


         * 企业侧系统在调用该接口方法之前，首先要产生长度为20个字节的随机字符串（数字和大、小写字母），并将口令与该随机字符串连接（例如，口令是字符串“1234567890”，生成的随机字符串是 “abcdefghij”，那么连接后的结果是字符串“1234567890abcdefghij”）。将连接后的结果转换为GBK编码的二进制数据，使用hashAlgorithm定义的哈希算法进行哈希计算，得到参数pwdHash的值作为认证信息。
         部级系统或省局系统接收到企业侧系统的下载请求后，将需要下发给该企业的备案管理数据文件（文件格式参见“企业下载数据格式.xsd”）依次进行如下处理：
         1）	对XML数据文件使用指定的压缩格式进行压缩；
         2）	对压缩后的信息使用哈希算法计算哈希值，然后对哈希值进行base64编码运算；
         3）	如需加密下载，则对压缩后的信息使用指定的加密算法加密，然后对加密结果进行base64编码运算；如不加密下载，则直接对压缩后的信息进行base64编码运算形成beianInfo。
         部级系统或省局系统将上述处理后的哈希值、编码运算后的加密（或者明文）结果、哈希算法、加密算法、压缩格式返回给企业系统（详见“企业下载数据格式.xsd”）


         * @apiParam {Number} ispId 接入服务提供者的标识，可在部/省局系统的公共查询中查询得到
         * @apiParam {String} userName 用户名，由企业所在省管局（或部管局）维护管理
         * @apiParam {String} randVal 企业侧系统调用该方法时生成的随机字符串，长度是20字节
         * @apiParam {String} pwdHash 使用指定的哈希算法对用户密码和随机字符串进行哈希运算，然后进行base64编码运算得到的结果，用户口令由企业所在省管局（或部管局）维护管理
         * @apiParam {Number} hashAlgorithm 哈希算法 0: MD5哈希算法
         *
         * @apiSuccess {XML}
         *该方法返回一个XML数据流（详见文件“企业最近上载数据查询方法调用返回数据格式.xsd”），其中描述了本次操作的结果代码、结果描述。
         如果成功，返回以下信息：
         <return>
         <msg_code>0</msg_code>
         <msg>代码描述</msg>
         <fileInfos>
         <hashAlgorithm>哈希算法</hashAlgorithm>
         <compressionFormat>压缩格式</compressionFormat>
         <encryptAlgorithm>加密算法</encryptAlgorithm>
         <dataSequence>数据文件序号</dataSequence>
         <return_FileName>上次上报的备案数据文件名</return_FileName>
         <beianInfo>上次上报备案信息内容</beianInfo>
         <beianInfoHash>备案信息的哈希值</beianInfoHash>
         </fileInfos>
         </return>
         企业侧系统收到上述数据后，首先对beianInfo信息进行base64解码，接着对解码后的信息使用encryptAlgorithm指定的加密算法解密，在得到备案信息的压缩信息后，再使用hashAlgorithm指定的哈希算法计算哈希值，然后与beianInfoHash信息base64解码后的信息进行比较。如果比较一致，那么备案信息的完整性得到保证；如果比较不一致，则哈希值验证未通过，备案数据不完整。最后，在通过完整性校验后，使用compressionFormat指定的压缩格式对压缩后的信息进行解压缩，得到备案数据信息。
         如果操作错误，返回以下信息：
         <return>
         <msg_code>x</msg_code>
         <msg>错误描述</msg>
         </return>
         */
        isp_querypreviousupload() {
            var me = this;
            return new Promise(function(res,rej){

            });
            return function * () {
                soap.createClient(url, function (err, client) {
                    console.log(client);
                    client.isp_querypreviousupload(args, function (err, result) {
                        console.log(result);
                    });
                });
            }
        }

        /**
         * @method 查询备案状态
         * @apiName isp_querybeianstatus
         * @apiGroup ISP
         * @apiPermission whitelist
         * @apiVersion 0.0.2
         *
         * @apiDescription 企业侧系统可以通过该方法查询网站或主体的备案状态（即：是否已经完成备案）。如果网站已经备案，则返回该网站的网站名称、主体备案号和网站备案号；如果主体已经备案，则返回该主体的主体备案号；
         注：本方法中计算哈希值是指对数据字节流的哈希值计算。

         * 企业侧系统在调用该接口方法之前，首先要产生长度为20个字节的随机字符串（数字和大、小写字母），并将口令与该随机字符串连接（例如，口令是字符串“1234567890”，生成的随机字符串是 “abcdefghij”，那么连接后的结果是字符串“1234567890abcdefghij”）。将连接后的结果转换为GBK编码的二进制数据，使用hashAlgorithm定义的哈希算法进行哈希计算，得到参数pwdHash的值作为认证信息。
         部级系统或省局系统接收到企业侧系统的下载请求后，将需要下发给该企业的备案管理数据文件（文件格式参见“企业下载数据格式.xsd”）依次进行如下处理：
         1）	对XML数据文件使用指定的压缩格式进行压缩；
         2）	对压缩后的信息使用哈希算法计算哈希值，然后对哈希值进行base64编码运算；
         3）	如需加密下载，则对压缩后的信息使用指定的加密算法加密，然后对加密结果进行base64编码运算；如不加密下载，则直接对压缩后的信息进行base64编码运算形成beianInfo。
         部级系统或省局系统将上述处理后的哈希值、编码运算后的加密（或者明文）结果、哈希算法、加密算法、压缩格式返回给企业系统（详见“企业下载数据格式.xsd”）


         * @apiParam {Number} ispId 接入服务提供者的标识，可在部/省局系统的公共查询中查询得到
         * @apiParam {String} userName 用户名，由企业所在省管局（或部管局）维护管理
         * @apiParam {String} randVal 企业侧系统调用该方法时生成的随机字符串，长度是20字节
         * @apiParam {String} pwdHash 使用指定的哈希算法对用户密码和随机字符串进行哈希运算，然后进行base64编码运算得到的结果，用户口令由企业所在省管局（或部管局）维护管理
         * @apiParam {Number} hashAlgorithm 哈希算法 0: MD5哈希算法
         * @apiParam {Number} queryConditionType 查询条件类型：
                     0-表示通过网站域名查询网站是否已备案；
                     1-表示通过工商营业执照号码查询单位主体是否备案；
                     2-表示通过个人身份证号码查询个人主体是否备案；
                     3-表示通过事业单位组织机构代码证号码查询单位主体是否备案；
                     4-表示通过事业法人证号码查询单位主体是否备案；
                     5-表示通过军队代号号码查询单位主体是否备案；
                     6-表示通过社会团体社团法人证号码查询单位主体是否备案；
                     7-表示通过护照号码查询个人主体是否备案；
                     8-表示通过军官证号码查询个人主体是否备案；
                     9-表示通过政府机关组织机构代码证号码查询单位主体是否备案；
                     10-表示通过社会团体组织机构代码证号码查询单位主体是否备案；
                     11-表示通过台胞证号码查询个人主体是否备案。
         * @apiParam {String} queryCondition 与queryConditionType对应的域名或证件号码：
         *
         * @apiSuccess {XML}
         *该方法返回一个XML数据流（详见文件“是否备案查询方法调用返回数据格式.xsd”），其中描述了本次操作的结果代码、结果描述以及是否备案信息。
         1）	查询成功的返回
         	已备案的结果信息：
         <return>
         <msg_code>0</msg_code>
         <msg>操作成功</msg>
         <StatusInfo>
         <Cxtjlx>条件类型</Cxtjlx>
         <Cxtj>网站域名或证件号码</Cxtj>
         <Wzmc>网站名称（当查询主体是否备案时，此项为空</Wzmc>
         <Ztbah>主体备案号</Ztbah>
         <Wzbah>网站备案号（当查询主体是否备案时，此项为空）</Wzbah>
         <Bazt>备案状态（0表示已备案）</Bazt>
         </StatusInfo>
         </return>
         	未备案的结果信息：
         <return>
         <msg_code>0</msg_code>
         <msg>操作成功</msg>
         <StatusInfo>
         <Cxtjlx>条件类型</Cxtjlx>
         <Cxtj>网站域名或证件号码</Cxtj>
         <Bazt>备案状态（1表示未备案）</Bazt>
         </StatusInfo>
         </return>
         2）	查询错误，结果信息如下
         <return>
         <msg_code>x</msg_code>
         <msg>错误描述</msg>
         </return>
         msg_code参见第3-4节的返回状态msg_code代码表。

         */
        isp_querybeianstatus() {
            var me = this;
            return new Promise(function(res,rej){

            });
            return function * () {
                soap.createClient(url, function (err, client) {
                    console.log(client);
                    client.isp_querypreviousupload(args, function (err, result) {
                        console.log(result);
                    });
                });
            }
        }

        /**
         * @method 校验备案密码是否正确
         * @apiName isp_verifybamm
         * @apiGroup ISP
         * @apiPermission whitelist
         * @apiVersion 0.0.2
         *
         * 方法调用限制：一定时间内，系统限制同一备案密码校验的次数，具体限制次数根据业务需要设定。
             企业侧系统可以通过该方法校验备案密码是否正确。
             注：本方法中计算哈希值是指对数据字节流的哈希值计算。

         * 企业侧系统在调用该接口方法之前，首先要产生长度为20个字节的随机字符串（数字和大、小写字母），并将口令与该随机字符串连接（例如，口令是字符串“1234567890”，生成的随机字符串是 “abcdefghij”，那么连接后的结果是字符串“1234567890abcdefghij”）。将连接后的结果转换为GBK编码的二进制数据，使用hashAlgorithm定义的哈希算法进行哈希计算，得到参数pwdHash的值作为认证信息。
         部级系统或省局系统接收到企业侧系统的下载请求后，将需要下发给该企业的备案管理数据文件（文件格式参见“企业下载数据格式.xsd”）依次进行如下处理：
         1）	对XML数据文件使用指定的压缩格式进行压缩；
         2）	对压缩后的信息使用哈希算法计算哈希值，然后对哈希值进行base64编码运算；
         3）	如需加密下载，则对压缩后的信息使用指定的加密算法加密，然后对加密结果进行base64编码运算；如不加密下载，则直接对压缩后的信息进行base64编码运算形成beianInfo。
         部级系统或省局系统将上述处理后的哈希值、编码运算后的加密（或者明文）结果、哈希算法、加密算法、压缩格式返回给企业系统（详见“企业下载数据格式.xsd”）


         * @apiParam {Number} ispId 接入服务提供者的标识，可在部/省局系统的公共查询中查询得到
         * @apiParam {String} userName 用户名，由企业所在省管局（或部管局）维护管理
         * @apiParam {String} randVal 企业侧系统调用该方法时生成的随机字符串，长度是20字节
         * @apiParam {String} pwdHash 使用指定的哈希算法对用户密码和随机字符串进行哈希运算，然后进行base64编码运算得到的结果，用户口令由企业所在省管局（或部管局）维护管理
         * @apiParam {Number} hashAlgorithm 哈希算法 0: MD5哈希算法
         * @apiParam {String} baxh 备案号
         * @apiParam {String} bamm 备案密码
         *
         * @apiSuccess {XML}
         该方法返回一个XML数据流，其中描述了本次操作的结果代码、结果描述以及是否校验成功。
         1）	校验操作成功的返回

         <return>
         <msg_code>0</msg_code>
         <msg>操作成功</msg>
         <VerifyRes>
         校验结果（0:表示校验成功1:表示校验失败）
         </VerifyRes >
         </return>
         2）	校验操作错误，结果信息如下
         <return>
         <msg_code>x</msg_code>
         <msg>错误描述</msg>
         </return>
         msg_code参见第3-4节的返回状态msg_code代码表。
         */
        isp_verifybamm() {
            var me = this;
            return new Promise(function(res,rej){

            });
            return function * () {
                soap.createClient(url, function (err, client) {
                    console.log(client);
                    client.isp_querypreviousupload(args, function (err, result) {
                        console.log(result);
                    });
                });
            }
        }

        getClassName() {
            return EasyNode.namespace(__filename);
        }
    }

    module.exports = IspService;
})();