import ReactPaginate from "react-paginate";

type PaginateProps = {
  data: unknown[];
  numberPage: number;
  setCurrentPage: (page: number) => void;
};

const Paginate = ({ data, numberPage, setCurrentPage }: PaginateProps) => {
  const handlePageClick = (event: { selected: number }) => setCurrentPage(event.selected);

  const pageCount = Math.ceil(data.length / numberPage);

  return (
    <>
      <div className="flex justify-center mt-5 cursor-pointer">
        <ReactPaginate
          previousLabel={"← Trước"}
          nextLabel={"Tiếp →"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"flex gap-2 text-sm"}
          activeClassName={"bg-blue-600 text-white rounded-lg px-3 py-1"}
          pageClassName={"px-3 py-1 border border-gray-300 rounded-lg"}
          previousClassName={
            "px-3 py-1 border border-gray-300 rounded-lg hover:border-2"
          }
          nextClassName={
            "px-3 py-1 border border-gray-300 rounded-lg hover:border-2 "
          }
        />
      </div>
    </>
  );
};

export default Paginate;
