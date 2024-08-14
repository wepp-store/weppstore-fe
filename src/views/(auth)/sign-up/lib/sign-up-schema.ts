import * as Yup from 'yup';

export const signUpSchema = Yup.object().shape({
  email: Yup.string()
    .required('이메일을 입력해주세요.')
    .matches(
      /^[a-zA-Z0-9+-_.]+@[a-z]+\.[a-z]{2,3}/i,
      '이메일 형식이 아닙니다.'
    ),
  password: Yup.string().required('비밀번호를 입력해주세요.'),
  password2: Yup.string().oneOf(
    [Yup.ref('password'), ''],
    '비밀번호가 일치하지 않습니다.'
  ),
  userName: Yup.string()
    .required('이름을 입력해주세요.')
    .max(12, '12자 이내로 입력해주세요.')
    .matches(
      /^[a-zA-Z0-9가-힣ㄱ-ㅣ._]*$/, // 허용할 문자들에 .과 _를 포함한 정규식
      '특수문자는 .과 _만 사용할 수 있습니다.'
    ),
});
