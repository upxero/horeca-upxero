export const FloatingSupportHint = () => {
  return (
    <>
      {/* Desktop */}
      <div className="fixed bottom-6 right-[96px] z-40 hidden sm:block">
        <div className="
          bg-white text-gray-700 text-xs
          px-3 py-2 rounded-full shadow
          flex items-center gap-1
          animate-pulse
        ">
          👉 Vragen? AI-assistent of WhatsApp-flow
        </div>
      </div>

      {/* Mobile – links van AI + WhatsApp */}
      <div className="fixed bottom-6 right-[98px] z-40 sm:hidden">
        <div className="
          bg-white text-gray-700 text-xs
          px-3 py-2 rounded-xl shadow
          animate-pulse
          whitespace-nowrap
        ">
          👉 Probeer AI of WhatsApp
        </div>
      </div>
    </>
  );
};
