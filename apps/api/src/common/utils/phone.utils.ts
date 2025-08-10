import { ErrorCode } from '../constants/error-code.constant';
import { BusinessException } from '../exceptions/business.exception';

// 校验手机号格式
export function validatePhoneNumber(
  phone: string,
  countryCode: string = '+86',
): boolean {
  // 移除所有非数字字符
  const cleanPhone = phone.replace(/\D/g, '');

  // 不同国家的手机号验证规则
  const phonePatterns: Record<string, RegExp> = {
    '+86': /^1[3-9]\d{9}$/, // 中国大陆
    '+852': /^[5-9]\d{7}$/, // 香港
    '+853': /^6\d{7}$/, // 澳门
    '+886': /^9\d{8}$/, // 台湾
    '+1': /^\d{10}$/, // 美国和加拿大
    '+44': /^7\d{9}$/, // 英国
    '+81': /^[789]0\d{8}$/, // 日本
    '+82': /^1\d{9}$/, // 韩国
    '+65': /^[689]\d{7}$/, // 新加坡
  };

  // 获取对应国家的验证规则
  const pattern = phonePatterns[countryCode];

  // 如果没有找到对应国家的验证规则，返回false
  if (!pattern) {
    throw new BusinessException(ErrorCode.FAIL, '不支持的国家或地区代码');
  }

  console.log('validatePhoneNumber', cleanPhone, pattern);
  console.log('validatePhoneNumber', pattern.test(cleanPhone));

  // 验证手机号格式
  if (!pattern.test(cleanPhone)) {
    throw new BusinessException(ErrorCode.FAIL, '无效的手机号格式');
  }

  return true;
}
