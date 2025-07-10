const EMAIL_NOTICE_CONTENTS = ['받은 품앗이 수', '준 품앗이 수', '품앗이 등수'];

export function EmailNoticeModalContent() {
  return (
    <>
      <h2 className="text-xl w-full text-center font-semibold">
        주간 품앗이 리포트 이메일 수신 안내
      </h2>
      <p>
        본 이메일은 품앗이 서비스 이용자의 활동을 요약하여 제공하는 주간 리포트
        메일입니다.
      </p>
      <p>이메일에는 아래와 같은 내용이 포함됩니다:</p>
      <ul className="list-disc list-inside space-y-1 ">
        {EMAIL_NOTICE_CONTENTS.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <p>
        해당 메일은 <strong>매주 월요일 오전</strong>에 발송되며, 수신을 원하지
        않으시면 언제든지 마이페이지에서 수신 여부를 변경하실 수 있습니다.
      </p>
      <p>
        본 이메일은 <strong>정보통신망법 제50조</strong> 및{' '}
        <strong>개인정보보호법</strong>에 따라, 사전 동의하신 분에 한해
        발송됩니다.
      </p>
      <p className="mb-8">
        📌 수신 동의를 하지 않아도 서비스 이용에는 영향을 주지 않습니다.
      </p>
    </>
  );
}
