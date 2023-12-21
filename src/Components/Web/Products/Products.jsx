import React, { useState, useEffect, useRef, useContext } from "react";
import "./products.css";
import axios from "axios";
import "./products.css";
import { useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { searchSchemaValidation } from "../Validate/SchemaValidation.js";
import { filterSchemaValidation } from "../Validate/SchemaValidation.js";
import { CartContext } from '../Context/CartContext.jsx'
import { UserContext } from "../Context/UserContext.jsx";


export default function Products() {
  const [searchParams] = useSearchParams();
  let page = searchParams.get("page");
  let sort = searchParams.get("sort");
  let search = searchParams.get("search");
  let limit = searchParams.get("limit");
  let pricegte = searchParams.get("price[gte]");
  let pricelte = searchParams.get("price[lte]");
  let inputRef1 = useRef(null);
  let inputRef2 = useRef(null);
  let inputRef3 = useRef(null);

  if(limit==null || limit==''){
    limit=4;
  }
  if(sort==null){
    sort='';
  }
  if(search==null){
    search='';
  }
  if(pricegte==null||pricegte==''){
    pricegte='0';
  }
  if(pricelte==null||pricelte==''){
    pricelte='100000000';
  }


  console.log(search, "searchhhhhhhhhhhhhhhhh");
  const [data, setData] = useState({});

  const [loading, setLoading] = useState(true);

  console.log(page);
  const { userTokenContext, setUserTokenContext } = useContext(UserContext);
  /********************************************************* */
  const getProducts = async () => {
    setLoading(true);
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/products?page=${page}&limit=${limit}&search=${search}&price[gte]=${pricegte}&price[lte]=${pricelte}&sort=${sort}`
      );
      console.log(data, "kkkkkk");
      setData(data);
      if (data?.message == "success") {
        setLoading(false);
        // setNoOfPages(data.total/data.page);
      }
    }
    
/******************************************************************************************* */
  // const getProducts = async () => {
  //   setLoading(true);

  //   if (search == null && pricelte == null && pricegte == null) {
  //     const { data } = await axios.get(
  //       `${
  //         import.meta.env.VITE_API_URL
  //       }/products?page=${page}&limit=${4}&sort=${sort}`
  //     );
  //     console.log(data, "kkkkkk");
  //     setData(data);
  //     if (data?.message == "success") {
  //       setLoading(false);
  //       // setNoOfPages(data.total/data.page);
  //     }
  //   } else if (search != null && pricelte == null && pricegte == null) {
  //     const { data } = await axios.get(
  //       `${import.meta.env.VITE_API_URL}/products?search=${search}&limit=${limit}`
  //     );
  //     console.log(data, "kkkkkk");
  //     setData(data);
  //     if (data?.message == "success") {
  //       setLoading(false);

  //       // setNoOfPages(data.total/data.page);
  //     }
  //   } else if (search == null && pricelte == null && pricegte != null) {
  //     const { data } = await axios.get(
  //       `${
  //         import.meta.env.VITE_API_URL
  //       }/products?page=${page}&price[gte]=${pricegte}&limit=${limit}`
  //     );
  //     console.log(data, "kkkkkk");
  //     setData(data);
  //     if (data?.message == "success") {
  //       setLoading(false);
  //       // setNoOfPages(data.total/data.page);
  //     }
  //   } else if (search == null && pricelte != null && pricegte == null) {
  //     const { data } = await axios.get(
  //       `${
  //         import.meta.env.VITE_API_URL
  //       }/products?page=${page}&price[lte]=${pricelte}&limit=${limit}`
  //     );
  //     console.log(data, "kkkkkk");
  //     setData(data);
  //     if (data?.message == "success") {
  //       setLoading(false);
  //       // setNoOfPages(data.total/data.page);
  //     }
  //   } else if (search == null && pricelte != null && pricegte != null) {
  //     console.log(pricelte, pricegte, "wOOOOOOOOOOOOOOOOOOOOw");
  //     const { data } = await axios.get(
  //       `${
  //         import.meta.env.VITE_API_URL
  //       }/products?page=${page}&price[gte]=${pricegte}&price[lte]=${pricelte}&limit=${limit}`
  //     );
  //     console.log(data, "kkkkkk");
  //     setData(data);
  //     if (data?.message == "success") {
  //       setLoading(false);
  //       // setNoOfPages(data.total/data.page);
  //     }
  //   }
  // };

  /******************************************************************************** */
  const options = [
    { value: "", text: "Sort By or Reset Sort" },
    { value: "name", text: "Name_ascending" },
    { value: "-name", text: "Name_descending" },
    { value: "price", text: "Price_ascending" },
    { value: "-price", text: "Price_descending" },
  ];

  const [selected, setSelected] = useState(options[0].value);
  const navigateSort = useNavigate();
  const handleSelectChange = (event) => {
    setSelected(event.target.value);
    navigateSort(`/products?page=${page}&limit=${limit}&search=${search}&price[gte]=${pricegte}&price[lte]=${pricelte}&sort=${event.target.value}`);
  };

  /*********************************************************************************** */
  const navigateSearch = useNavigate();
  const initialValues = {
    search: "",
  };

  const onSubmit = (input) => {
    navigateSearch(`/products?page=${1}&limit=${limit}&search=${input.search}&price[gte]=${pricegte}&price[lte]=${pricelte}&sort=${sort}`);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: searchSchemaValidation,
  });

  const inputProps = [
    {
      type: "text",
      name: "search",
      id: "search",
      onChange: formik.handleChange,
      value: formik.values.search,
    },
  ];

  /******************************************************************************************* */
  const navigateFilter = useNavigate();

  const initialValuesFilter = {
    priceFrom: null,
    priceTo: null,
  };

  const onSubmitFilter = async (input) => {
    
    navigateFilter(`/products?page=${1}&limit=${limit}&search=${search}&price[gte]=${input.priceFrom}&price[lte]=${input.priceTo}&sort=${sort}`);
      
    
  };
  const formikFilter = useFormik({
    initialValues: initialValuesFilter,
    onSubmit: onSubmitFilter,
    validationSchema: filterSchemaValidation,
  });

  const inputPropsFilter = [
    {
      type: "text",
      name: "priceFrom",
      id: "priceFrom",
      title: "Price From",

      onChange: formikFilter.handleChange,
      value: formikFilter.values.priceFrom,
    },
    {
      type: "text",
      name: "priceTo",
      id: "priceTo",
      title: "price To",

      onChange: formikFilter.handleChange,
      value: formikFilter.values.priceTo,
    },
  ];

  /******************************************************************************************* */
  const resetNavigate = useNavigate();

  const navigateProducts = () => {
    inputRef1.current.value = null;
    inputRef2.current.value = null;
    inputRef3.current.value = null;
    formikFilter.values.priceFrom = null;
    formikFilter.values.priceTo = null;
    formik.values.search = null;
    setTimeout(() => {
      resetNavigate("/products?page=1");
    }, 100);
  };

  console.log(data.page, "data.paaaaaaaaaaaage");

  /********************************************************** */
  useEffect(() => {
    getProducts();
  }, [
    page,
    sort,
    search,
   limit,
    pricelte,
    pricegte,
    inputRef1,
    inputRef2,
    inputRef3,
  ]);
// console.log(data?.page,limit,'pageeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
const {addToCartContext}=useContext(CartContext);
  const addToCart=async (productId)=>{
    const res=await addToCartContext(productId);
    console.log(res);
  }

  /**************************************************************** */
  const navigate = useNavigate();
  
  const getProducts_next = (e) => {
    if (page < data.total / data.page) {
      console.log(page, "nexxxt");

      // navigate(`/products?page=${page - -1}&sort=${sort}`);
      navigate(`/products?page=${page - -1}&sort=${sort}&limit=${limit}&search=${search}&price[gte]=${pricegte}&price[lte]=${pricelte}&sort=${sort}`)
    } else {
      e.preventDefault();
    }
  };

  const getProducts_previous = (e) => {
    if (page == 1) {
      e.preventDefault();
    } else {
      // navigate(`/products?page=${page - 1}&sort=${sort}`);
      navigate(`/products?page=${page - 1}&sort=${sort}&limit=${limit}&search=${search}&price[gte]=${pricegte}&price[lte]=${pricelte}&sort=${sort}`)

    }
  };
  /********************************************************* */
  if (loading) {
    return <h2>Loading.......</h2>;
  }
  if (data.page == 0) {
    return (
      <h2 className="bg-danger text-white w-75 p-5 h-50">
        no products match your search, move back and try use another words!
      </h2>
    );
  }
  return (

    <div className="products-page pt-3">
          <div className="container ">
      <div className="products-header d-flex mb-5 justify-content-between align-items-center px-5 py-3">
        
      <form className="searchBar w-25 d-flex" onSubmit={formik.handleSubmit}>
        {/* {inputProps.map((inputProp, index) => {
          return ( */}
          <div className="d-flex flex-column">
        <input
          type="text"
          name="search"
          id="search"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.search}
          ref={inputRef1}
          className='rounded-2'
        />
          {(formik.errors['search']&&<p className='text-danger'>{formik.errors['search']}</p>)}
</div>
        <button
          type="submit"
          disabled={Object.keys(formik.errors).length > 0}
          className="search-button h-75 ms-2 rounded-2 w-75 fs-5"
        >
          Search
        </button>
      </form>

      <form className="Filter w-25 d-flex" onSubmit={formikFilter.handleSubmit}>
      <div className="d-flex flex-column ">
        <input
          type="text"
          name="priceFrom"
          id="priceFrom"
          className="form-control h-100 price"
          value={formikFilter.values.priceFrom}
          onChange={formikFilter.handleChange}
          onBlur={formikFilter.handleBlur}
          ref={inputRef2}
          placeholder='price from'
         
        />
        {formikFilter.touched["priceFrom"] &&
          formikFilter.errors["priceFrom"] && (
            <p className="text-danger">{formikFilter.errors["priceFrom"]}</p>
          )}
</div>
<div className="d-flex flex-column">
        <input
          type="text"
          name="priceTo"
          id="priceTo"
          className="form-control h-100 ms-2 price"
          value={formikFilter.values.priceTo}
          onChange={formikFilter.handleChange}
          onBlur={formikFilter.handleBlur}
          ref={inputRef3}
          placeholder='price to'
        />
        {formikFilter.errors["priceTo"] && (
          <p className="text-danger">{formikFilter.errors["priceTo"]}</p>
        )}
</div>
        <button
          type="submit"
          disabled={Object.keys(formikFilter.errors).length > 0}
          className="Filter-Price-btn ms-3 rounded-2 w-75 fs-5"
        >
          Filter
        </button>
      </form>

<div className="d-flex align-items-center">
<select
        className="form-select bg-success text-white h-50 w-100 rounded-2 fs-5"
        aria-label="Default select example"
        value={selected}
        onChange={handleSelectChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
</div>
      <button className="reset rounded-2 fs-5 p-2" onClick={() => navigateProducts()}>
       
        Reset Fields
      </button>
      </div>

      <div className="row text-center row-gap-4 ">
        {data?.products.length > 0 && data?.page != 0 ? (
          data.products.map((product, index) => {
            return (
              <div className="col-lg-3 product-cardd rounded-4 ">
                <div className="product-itemm  bg-white rounded-4 d-flex flex-column  justify-content-center align-items-center" key={index}>
                <h2 className="mb-5 text-black fs-5 rounded-2 p-2">{product.name}</h2>
                <div className="imgContainerr rounded-circle">
                  <img src={product.mainImage.secure_url} className=" rounded-circle" />
                </div>
                {/* <div className='price bg-success w-25 h-25'> */}
                <h2 className="product-price mt-4 text-black fs-5 p-3 rounded-4">Price: ${product.price}</h2>
                {/* </div> */}

                <div className="avg-rating mb-3 d-flex align-items-center bg-white p-3 rounded-2">

        <>
              {
               
                ((Math.round((Math.round(product.avgRating*2)/2)))-0.5)==((Math.round(product.avgRating*2)/2))?
                
                Array.from({ length: (Math.round(product.avgRating*2)/2)+0.5 }).map((_,index)=>{
                  return (
                  
                  index==(Math.round(product.avgRating*2)/2)-0.5?<svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path fill="#f57c19" d="M288 376.4l.1-.1 26.4 14.1 85.2 45.5-16.5-97.6-4.8-28.7 20.7-20.5 70.1-69.3-96.1-14.2-29.3-4.3-12.9-26.6L288.1 86.9l-.1 .3V376.4zm175.1 98.3c2 12-3 24.2-12.9 31.3s-23 8-33.8 2.3L288.1 439.8 159.8 508.3C149 514 135.9 513.1 126 506s-14.9-19.3-12.9-31.3L137.8 329 33.6 225.9c-8.6-8.5-11.7-21.2-7.9-32.7s13.7-19.9 25.7-21.7L195 150.3 259.4 18c5.4-11 16.5-18 28.8-18s23.4 7 28.8 18l64.3 132.3 143.6 21.2c12 1.8 22 10.2 25.7 21.7s.7 24.2-7.9 32.7L438.5 329l24.6 145.7z"/></svg>

                 :
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path fill="#f57c19" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
                      )              
                     })
                
                  

                 :
                 Array.from({ length: (Math.round(product.avgRating*2)/2)}).map((_,index)=>{
                 return <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path fill="#f57c19" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>

                 })

                
              }
              {
               (Math.round(product.avgRating*2)/2)<4.5?
               Array.from({ length:Math.round(5-(Math.round(product.avgRating*2)/2)-0.5)}).map((_,index)=>{
                return <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path fill="#4b4949" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>

                })
                :
             ''
              }
               </>
          
           
               </div>






                <div className="details d-flex text-align-center justify-content-center  mt-4 w-100 ">
                  <Link
                    className="product-detail bg-info p-2 rounded-2 w-100 fs-5"
                    to={`/products/${product._id}`}
                  >
                   <span> More details </span>
                   <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 448 512"><path fill="#d92417" d="M128 40c0-22.1 17.9-40 40-40s40 17.9 40 40V188.2c8.5-7.6 19.7-12.2 32-12.2c20.6 0 38.2 13 45 31.2c8.8-9.3 21.2-15.2 35-15.2c25.3 0 46 19.5 47.9 44.3c8.5-7.7 19.8-12.3 32.1-12.3c26.5 0 48 21.5 48 48v48 16 48c0 70.7-57.3 128-128 128l-16 0H240l-.1 0h-5.2c-5 0-9.9-.3-14.7-1c-55.3-5.6-106.2-34-140-79L8 336c-13.3-17.7-9.7-42.7 8-56s42.7-9.7 56 8l56 74.7V40zM240 304c0-8.8-7.2-16-16-16s-16 7.2-16 16v96c0 8.8 7.2 16 16 16s16-7.2 16-16V304zm48-16c-8.8 0-16 7.2-16 16v96c0 8.8 7.2 16 16 16s16-7.2 16-16V304c0-8.8-7.2-16-16-16zm80 16c0-8.8-7.2-16-16-16s-16 7.2-16 16v96c0 8.8 7.2 16 16 16s16-7.2 16-16V304z"/></svg>                   
                  </Link>
                </div>
                <button className='justify-content-center d-flex align-items-center bg-success rounded-2 w-100 fs-5 my-2' onClick={()=>addToCart(product._id)} disabled={userTokenContext?false:true}> <p className="me-2 text-white">Add to Cart</p>
                <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 576 512"><path fill="#fff" d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM252 160c0 11 9 20 20 20h44v44c0 11 9 20 20 20s20-9 20-20V180h44c11 0 20-9 20-20s-9-20-20-20H356V96c0-11-9-20-20-20s-20 9-20 20v44H272c-11 0-20 9-20 20z"/></svg>
                </button>

              </div>

              </div>
            );
          })
        ) : (
          <h2> no products</h2>
        )}
      </div>

      <nav className="text-center m-auto d-flex justify-content-center mt-3">
        <ul className="pagination m-auto">
          <li className="page-item">
            <Link
              className="page-link"
              style={{ pointerEvents: page == 1 ? "none" : "" }}
              onClick={(e) => getProducts_previous(e)}
            >
              Previous
            </Link>
          </li>
          {data?.total<=4? (
          
            <li className="page-item">
              <Link className="page-link" to="">
                1
              </Link>
            </li>
          ) : (
            Array.from({ length: 2 }).map((_, index) => {
              return (
                <li className="page-item" key={index}>
                  <Link
                    className="page-link"
                    to={`/products?page=${index + 1}&sort=${sort}`}
                  >
                    {index + 1}
                  </Link>
                </li>
              );
            })
          )}
          <li className="page-item">
            <Link
              className="page-link"
              style={{
                pointerEvents:
                  page == data?.total / data || search?.page ? "none" : "",
              }}
              onClick={(e) => getProducts_next(e)}
            >
              Next
            </Link>
          </li>
        </ul>
      </nav>
    </div>
    </div>
  );
}
