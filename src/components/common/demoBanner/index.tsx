export function DemoBanner() {
  return (
    <div className="fixed top-0 inset-x-0 z-[1000] h-9 bg-yellow-100 text-yellow-900 border-b border-yellow-300 text-center text-xs sm:text-sm flex items-center justify-center px-3 shadow-sm">
      ⚠️ 본 서비스에 표시되는 모든 데이터는 데모를 위해 생성된 mock
      데이터입니다.
    </div>
  );
}

export default DemoBanner;
