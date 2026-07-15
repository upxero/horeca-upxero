export default function Maintenance() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">

      <div className="max-w-xl w-full bg-gray-900 rounded-2xl border border-gray-800 shadow-xl p-10 text-center">

        <div className="flex justify-center items-center gap-3 mb-10">
          <div className="bg-gradient-to-br from-blue-900 to-blue-700 w-12 h-12 rounded-lg flex items-center justify-center">
            <img
              src="/images/logo-white.png"
              alt="Upxero"
              className="w-7 h-7"
            />
          </div>

          <span className="text-3xl font-bold text-white">
            UPXERO
          </span>
        </div>


        <div className="w-16 h-16 rounded-full bg-orange-500 mx-auto mb-6 animate-pulse"></div>


        <h1 className="text-3xl font-bold text-white mb-5">
          Website wordt vernieuwd
        </h1>


        <p className="text-gray-400 text-lg">
          Wij werken momenteel aan een vernieuwde website 
          voor horecaondernemers in België en Nederland.
        </p>


        <a
          href="mailto:info@upxero.com"
          className="inline-block mt-8 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold"
        >
          Contact opnemen
        </a>


        <p className="text-sm text-gray-500 mt-8">
          © 2026 Upxero — Digitale oplossingen voor horeca
        </p>

      </div>

    </div>
  );
}