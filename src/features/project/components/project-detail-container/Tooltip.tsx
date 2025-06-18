export function Tooltip() {
  return (
    <div className="absolute top-6 right-0 p-4 hidden group-hover:block text-sm bg-black/80 text-white shadow-lg rounded-lg w-xs">
      <h3 className="font-semibold mb-2">품앗이는?</h3>
      <p className=" mb-1">- 다른 팀의 프로젝트를 방문하는 행위예요!</p>
      <p>- 준 품앗이 횟수에 따라 등수가 올라가요!</p>
      <p>- 많이 방문할수록 우리 팀의 프로젝트가 상단에 노출돼요!</p>
      <p className="text-sm mb-1">
        - 다른 프로젝트에 <strong>품앗이</strong>를 하면, 해당 팀에 우리 팀의{' '}
        <strong>뱃지</strong>가 전달돼요!
      </p>
    </div>
  );
}
