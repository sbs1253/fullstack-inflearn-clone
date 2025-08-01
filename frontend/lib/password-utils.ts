import bcrypt from 'bcryptjs';

/**
 * 비밀번호 암호화 유틸리티
 *
 * bcryptjs: 비밀번호 해싱 전용 라이브러리
 * - 일방향 암호화 (복호화 불가능)
 * - Salt 자동 생성으로 레인보우 테이블 공격 방지
 * - 적응형 해싱으로 보안 강도 조절 가능
 */

/**
 * 비밀번호 해싱 함수 (회원가입 시 사용)
 *
 * @param password - 사용자가 입력한 평문 비밀번호
 * @returns 해싱된 비밀번호 (Salt + Hash 포함)
 *
 * 과정:
 * 1. saltRounds(10)로 Salt 생성 - 2^10 = 1024번 해싱 반복
 * 2. 평문 비밀번호 + Salt를 조합해서 해싱
 * 3. 결과: "$2a$10$[22글자Salt][31글자Hash]" 형태로 반환
 *
 * 예시: "mypassword" → "$2a$10$N9qo8uLOickgx2ZMRZoMye.fDDfNjSoBf6j6CnPl8Ky4.7AZmFyG2"
 */
export function saltAndHashPassword(password: string) {
  const saltRounds = 10; // 암호화 강도 (높을수록 안전하지만 느림)
  const salt = bcrypt.genSaltSync(saltRounds); // Salt 생성
  const hash = bcrypt.hashSync(password, salt); // 비밀번호 해싱
  return hash; // Salt가 포함된 해시 반환
}

/**
 * 비밀번호 검증 함수 (로그인 시 사용)
 *
 * @param password - 사용자가 입력한 평문 비밀번호
 * @param hash - DB에 저장된 해싱된 비밀번호
 * @returns boolean - 비밀번호 일치 여부 (true/false)
 *
 * 검증 과정:
 * 1. 저장된 hash에서 사용된 Salt 값 추출
 * 2. 입력된 password + 추출한 Salt로 동일한 방식으로 해싱
 * 3. 새로 생성된 해시와 저장된 해시 비교
 * 4. 일치하면 true, 불일치하면 false 반환
 *
 * 핵심: 같은 Salt를 사용하면 같은 비밀번호에서 항상 같은 해시가 생성됨
 */
export function comparePassword(password: string, hash: string) {
  return bcrypt.compareSync(password, hash); // 동기식 비교
}
