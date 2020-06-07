/**加密解密方法封装
 * @author yanruiting 2020-05-29
 * 参数说明
 * opt:
 * * ****publicKey: 一般接口请求，但暂时写死MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCF5tLR4nPRihcu/78gmRq9ukwtlCMko+mf/9JOdLQVPdqMS54K2VuBRKKKpVNGzb8w/wG78HB3SokPZ8smPmetkb2bgMlR6C7enmRNPkfqOBGu8Gnh+djRybbeiAvrQJapUi+72kZj2Yf497GlOBqpvJBoHLmkKIxb4BXu6Q93wQIDAQAB
 * * ****method:默认POST
 */
import JSEncrypt from 'jsencrypt';
export default {
  data () {
    return {
      publicKey: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCF5tLR4nPRihcu/78gmRq9ukwtlCMko+mf/9JOdLQVPdqMS54K2VuBRKKKpVNGzb8w/wG78HB3SokPZ8smPmetkb2bgMlR6C7enmRNPkfqOBGu8Gnh+djRybbeiAvrQJapUi+72kZj2Yf497GlOBqpvJBoHLmkKIxb4BXu6Q93wQIDAQAB'
    }
  },
  methods: {
    //  加密
    encryptedData(data) {
      var that = this;
      // 新建JSEncrypt对象
      let encryptor = new JSEncrypt();
      // 设置公钥
      encryptor.setPublicKey(that.publicKey);
      // 加密数据
      return encryptor.encrypt(data);
    },
    // 解密
    decryptData(privateKey,data){
      // 新建JSEncrypt对象
      let decrypt= new JSEncrypt();
      // 设置私钥
      decrypt.setPrivateKey(that.privateKey);
      // 解密数据
      decrypt.decrypt(secretWord);
    }
  }
}
