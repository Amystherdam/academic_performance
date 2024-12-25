interface IPaginator {
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
}

export default function Paginator(props: IPaginator) {
  const { setPageSize } = props;

  return (
    <>
      <div className="flex flex-col items-center mt-3">
        <div className="w-1/2 block p-6 bg-white border border-gray-200 rounded-t-lg shadow  dark:bg-gray-800 dark:border-gray-700 ">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Top Bests
          </h5>
          <p className="mb-5 font-normal text-gray-700 dark:text-gray-400">
            Students closer to 100!
          </p>
          <span
            onClick={() => {
              setPageSize(1);
            }}
            className="font-normal text-white mr-2 bg-[#80297d] rounded-full p-3 cursor-pointer"
          >
            1
          </span>
          <span
            onClick={() => {
              setPageSize(5);
            }}
            className="font-normal text-white mr-2 bg-[#80297d] rounded-full p-3 cursor-pointer"
          >
            5
          </span>
          <span
            onClick={() => {
              setPageSize(10);
            }}
            className="font-normal text-white mr-2 bg-[#80297d] rounded-full p-3 cursor-pointer"
          >
            10
          </span>
          <span
            onClick={() => {
              setPageSize(20);
            }}
            className="font-normal text-white mr-2 bg-[#80297d] rounded-full p-3 cursor-pointer"
          >
            20
          </span>
          <span
            onClick={() => {
              setPageSize(50);
            }}
            className="font-normal text-white mr-2 bg-[#80297d] rounded-full p-3 cursor-pointer"
          >
            50
          </span>
        </div>
      </div>
    </>
  );
}
