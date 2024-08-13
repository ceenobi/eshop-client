import { productService } from "@/api";
import { Loader, Texts } from "@/components";
import { useFetch, useTitle } from "@/hooks";
import { Suspense, useEffect, useMemo, useRef } from "react";
import { Alert, Form } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import Skeleton from "react-loading-skeleton";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";

export default function Search() {
  const [searchParams] = useSearchParams();
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const query = searchParams.get("query") || inputRef.current?.value || "";
  const { data, error, loading } = useFetch(
    productService.searchProducts,
    query
  );
  const searchResult = useMemo(() => data, [data]);
  useTitle(`Search results for ${query}`);

  useEffect(() => {
    if (query) {
      inputRef.current.value = query;
    }
  }, [query]);

  const handleSearch = useDebouncedCallback((e) => {
    if (e) {
      e.preventDefault();
      const value = e.target.value;
      const params = new URLSearchParams(searchParams);
      if (value.length > 3) {
        params.set("query", value);
      } else {
        params.delete("query");
      }
      navigate(`/products/search?${params.toString()}`);
    }
  }, 200);

  useEffect(() => {
    if (inputRef.current && inputRef.current?.value !== "") {
      const params = new URLSearchParams(searchParams);
      params.set("query", inputRef.current?.value);
      navigate(window.location.pathname + "?" + params.toString());
    }
  }, [inputRef.current?.value, navigate, searchParams]);

  const deleteParams = () => {
    const newSearchParams = new URLSearchParams(window.location.search);
    newSearchParams.delete("query");
    navigate(window.location.pathname + "?" + newSearchParams.toString());
    inputRef.current.value = "";
  };

  return (
    <>
      <div className="mt-4 d-flex justify-content-between align-items-center">
        <Texts
          text="Products"
          size="0.8rem"
          className="text-uppercase fw-semibold"
        />
        <Texts
          text={`${searchResult.length}${" "}results`}
          size="0.8rem"
          className="text-uppercase fw-semibold"
        />
      </div>
      <div className="position-relative" style={{ height: "50px" }}>
        <Form.Control
          placeholder="Search Footsy products"
          aria-label="Search bar"
          className="rounded-0"
          style={{ height: "50px" }}
          ref={inputRef}
          onChange={handleSearch}
        />
        {query && (
          <IoClose
            className="position-absolute top-50 translate-middle cursor"
            style={{ right: "20px" }}
            onClick={deleteParams}
          />
        )}
      </div>
      {error && (
        <Alert variant="danger" className="mt-5">
          {error?.response?.data?.error || error.message}
        </Alert>
      )}
      {loading && searchResult.length > 0 && (
        <div className="mt-3 d-flex gap-4 align-items-center flex-wrap">
          {Array.from({ length: 4 }, (_, index) => (
            <Skeleton
              key={index}
              height="30px"
              width="150px"
              containerClassName="product-skeleton"
              className="rounded-3"
            />
          ))}
        </div>
      )}
      {!error && searchResult.length > 0 && (
        <Suspense fallback={<Loader />}>
          <div className="mt-4 d-flex flex-wrap gap-4 align-items-center">
            {searchResult.map((item) => (
              <Link
                to={`/products/${item.category.toLowerCase()}/${item.slug}`}
                key={item._id}
              >
                <Texts
                  text={item.name
                    .split(new RegExp(`(${query})`, "gi"))
                    .map((part, index) =>
                      part.toLowerCase() === query.toLowerCase() ? (
                        <span key={index} className="fw-bold text-success">
                          {part}
                        </span>
                      ) : (
                        part
                      )
                    )}
                  size="0.8rem"
                  color="var(--bg-zinc-700)"
                />
              </Link>
            ))}
          </div>
        </Suspense>
      )}
      {!error && !loading && query && searchResult.length <= 0 && (
        <Texts
          text={
            <>
              No results matching &quot;<b>{query}</b>&quot;
            </>
          }
          size="0.8rem"
          className="mt-3 text-uppercase"
        />
      )}
    </>
  );
}
