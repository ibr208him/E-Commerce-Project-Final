// import React, { useState, useEffect, useRef } from "react";
// import "./products.css";
// import axios from "axios";
// import "./products.css";
// import { useSearchParams } from "react-router-dom";
// import { useFormik } from "formik";
// import { Link, useNavigate } from "react-router-dom";
// import Input from "../../Shared/Input.jsx";
// import { searchSchemaValidation } from "../Validate/SchemaValidation.js";
// import { filterSchemaValidation } from "../Validate/SchemaValidation.js";

// export default function Products() {
//   const [searchParams] = useSearchParams();
//   let page = searchParams.get("page");
//   let sort = searchParams.get("sort");
//   let search = searchParams.get("search");
//   let limit = searchParams.get("limit");
//   let pricegte = searchParams.get("price[gte]");
//   let pricelte = searchParams.get("price[lte]");
//   let inputRef1 = useRef(null);
//   let inputRef2 = useRef(null);
//   let inputRef3 = useRef(null);



//   console.log(search, "searchhhhhhhhhhhhhhhhh");
//   const [data, setData] = useState({});

//   const [loading, setLoading] = useState(true);

//   console.log(page);
//   const navigate = useNavigate();

//   const getProducts_next = (e) => {
//     if (page < data.total / data.page) {
//       console.log(page, "nexxxt");

//       navigate(`/products?page=${page - -1}&sort=${sort}`);
//     } else {
//       e.preventDefault();
//     }
//   };

//   const getProducts_previous = (e) => {
//     if (page == 1) {
//       e.preventDefault();
//     } else {
//       navigate(`/products?page=${page - 1}&sort=${sort}`);
//     }
//   };

// /******************************************************************************************* */
//   const getProducts = async () => {
//     setLoading(true);

//     if (search == null && pricelte == null && pricegte == null) {
//       const { data } = await axios.get(
//         `${
//           import.meta.env.VITE_API_URL
//         }/products?page=${page}&limit=${4}&sort=${sort}`
//       );
//       console.log(data, "kkkkkk");
//       setData(data);
//       if (data?.message == "success") {
//         setLoading(false);
//         // setNoOfPages(data.total/data.page);
//       }
//     } else if (search != null && pricelte == null && pricegte == null) {
//       const { data } = await axios.get(
//         `${import.meta.env.VITE_API_URL}/products?search=${search}&limit=${limit}`
//       );
//       console.log(data, "kkkkkk");
//       setData(data);
//       if (data?.message == "success") {
//         setLoading(false);

//         // setNoOfPages(data.total/data.page);
//       }
//     } else if (search == null && pricelte == null && pricegte != null) {
//       const { data } = await axios.get(
//         `${
//           import.meta.env.VITE_API_URL
//         }/products?page=${page}&price[gte]=${pricegte}&limit=${limit}`
//       );
//       console.log(data, "kkkkkk");
//       setData(data);
//       if (data?.message == "success") {
//         setLoading(false);
//         // setNoOfPages(data.total/data.page);
//       }
//     } else if (search == null && pricelte != null && pricegte == null) {
//       const { data } = await axios.get(
//         `${
//           import.meta.env.VITE_API_URL
//         }/products?page=${page}&price[lte]=${pricelte}&limit=${limit}`
//       );
//       console.log(data, "kkkkkk");
//       setData(data);
//       if (data?.message == "success") {
//         setLoading(false);
//         // setNoOfPages(data.total/data.page);
//       }
//     } else if (search == null && pricelte != null && pricegte != null) {
//       console.log(pricelte, pricegte, "wOOOOOOOOOOOOOOOOOOOOw");
//       const { data } = await axios.get(
//         `${
//           import.meta.env.VITE_API_URL
//         }/products?page=${page}&price[gte]=${pricegte}&price[lte]=${pricelte}&limit=${limit}`
//       );
//       console.log(data, "kkkkkk");
//       setData(data);
//       if (data?.message == "success") {
//         setLoading(false);
//         // setNoOfPages(data.total/data.page);
//       }
//     }
//   };

//   /******************************************************************************** */
//   const options = [
//     { value: "", text: "Sorty By" },
//     { value: "name", text: "Name_ascending" },
//     { value: "-name", text: "Name_descending" },
//     { value: "price", text: "Price_ascending" },
//     { value: "-price", text: "Price_descending" },
//   ];

//   const [selected, setSelected] = useState(options[0].value);
//   const navigateSort = useNavigate();
//   const handleSelectChange = (event) => {
//     setSelected(event.target.value);
//     navigateSort(`/products?page=${page}&sort=${event.target.value}`);
//   };

//   /*********************************************************************************** */
//   const navigateSearch = useNavigate();
//   const initialValues = {
//     search: "",
//   };

//   const onSubmit = (input) => {
//     navigateSearch(`/products?page=${page}&search=${input.search}&limit=8`);
//   };

//   const formik = useFormik({
//     initialValues,
//     onSubmit,
//     validationSchema: searchSchemaValidation,
//   });

//   const inputProps = [
//     {
//       type: "text",
//       name: "search",
//       id: "search",
//       onChange: formik.handleChange,
//       value: formik.values.search,
//     },
//   ];

//   /******************************************************************************************* */
//   const navigateFilter = useNavigate();
//   const initialValuesFilter = {
//     priceFrom: null,
//     priceTo: null,
//   };

//   const onSubmitFilter = async (input) => {
//     if (
//       input.priceFrom != null &&
//       input.priceFrom != "" &&
//       input.priceTo != null &&
//       input.priceTo != ""
//     ) {
//       navigateSearch(
//         `/products?page=${page}&price[gte]=${input.priceFrom}&price[lte]=${input.priceTo}&limit=8`
//       );
//       console.log(
//         `input.priceFrom=${input.priceFrom} and input.priceTo=${input.priceTo}&limit=8`
//       );
//     } else {
//       if (
//         input.priceFrom != null &&
//         input.priceFrom != "" &&
//         (input.priceTo == null || input.priceTo == "")
//       ) {
//         navigateSearch(`/products?page=${page}&price[gte]=${input.priceFrom}&limit=8`);
//       } else if (
//         (input.priceFrom == null || input.priceFrom == "") &&
//         input.priceTo != null &&
//         input.priceTo != ""
//       ) {
//         navigateSearch(`/products?page=${page}&price[lte]=${input.priceTo}&limit=8`);
//       }
//     }
//   };
//   const formikFilter = useFormik({
//     initialValues: initialValuesFilter,
//     onSubmit: onSubmitFilter,
//     validationSchema: filterSchemaValidation,
//   });

//   const inputPropsFilter = [
//     {
//       type: "text",
//       name: "priceFrom",
//       id: "priceFrom",
//       title: "Price From",

//       onChange: formikFilter.handleChange,
//       value: formikFilter.values.priceFrom,
//     },
//     {
//       type: "text",
//       name: "priceTo",
//       id: "priceTo",
//       title: "price To",

//       onChange: formikFilter.handleChange,
//       value: formikFilter.values.priceTo,
//     },
//   ];

//   /******************************************************************************************* */
//   const resetNavigate = useNavigate();

//   const navigateProducts = () => {
//     inputRef1.current.value = null;
//     inputRef2.current.value = null;
//     inputRef3.current.value = null;
//     formikFilter.values.priceFrom = null;
//     formikFilter.values.priceTo = null;
//     formik.values.search = null;
//     setTimeout(() => {
//       resetNavigate("/products?page=1");
//     }, 100);
//   };

//   console.log(data.page, "data.paaaaaaaaaaaage");

//   /********************************************************** */
//   useEffect(() => {
//     getProducts();
//   }, [
//     page,
//     sort,
//     search,
//    limit,
//     pricelte,
//     pricegte,
//     inputRef1,
//     inputRef2,
//     inputRef3,
//   ]);
// // console.log(data?.page,limit,'pageeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');

//   if (loading) {
//     return <h2>Loading.......</h2>;
//   }
//   if (data.page == 0) {
//     return (
//       <h2 className="bg-danger w-75 p-5 h-50">
//         no products match your search, move back and try use another words!
//       </h2>
//     );
//   }
//   return (

//     <div className="products-page pt-3">
//           <div className="container ">
//       <div className="products-header d-flex mb-5 justify-content-between align-items-center px-5 py-3">
        
//       <form className="searchBar w-25 d-flex" onSubmit={formik.handleSubmit}>
//         {/* {inputProps.map((inputProp, index) => {
//           return ( */}
//         <input
//           type="text"
//           name="search"
//           id="search"
//           onChange={formik.handleChange}
//           value={formik.values.search}
//           ref={inputRef1}
//           className='h-50'
//         />
//         <button
//           type="submit"
//           disabled={Object.keys(formik.errors).length > 0}
//           className="search-button h-50 ms-2"
//         >
//           Search
//         </button>
//       </form>

//       <form className="Filter w-25 d-flex" onSubmit={formikFilter.handleSubmit}>
//         <input
//           type="text"
//           name="priceFrom"
//           id="priceFrom"
//           className="form-control h-50"
//           value={formikFilter.values.priceFrom}
//           onChange={formikFilter.handleChange}
//           onBlur={formikFilter.handleBlur}
//           ref={inputRef2}
//           placeholder='price from'
         
//         />
//         {formikFilter.touched["priceFrom"] &&
//           formikFilter.errors["priceFrom"] && (
//             <p className="text-danger">{formikFilter.errors["priceFrom"]}</p>
//           )}

//         <input
//           type="text"
//           name="priceTo"
//           id="priceTo"
//           className="form-control h-50 ms-2"
//           value={formikFilter.values.priceTo}
//           onChange={formikFilter.handleChange}
//           onBlur={formikFilter.handleBlur}
//           ref={inputRef3}
//           placeholder='price to'
//         />
//         {formikFilter.touched["priceTo"] && formikFilter.errors["priceTo"] && (
//           <p className="text-danger">{formikFilter.errors["priceTo"]}</p>
//         )}

//         <button
//           type="submit"
//           disabled={Object.keys(formikFilter.errors).length > 0}
//           className="Filter-Price-btn ms-2"
//         >
//           Filter
//         </button>
//       </form>

// <div className="d-flex align-items-center">
// <select
//         className="form-select bg-success text-white"
//         aria-label="Default select example"
//         value={selected}
//         onChange={handleSelectChange}
//       >
//         {options.map((option) => (
//           <option key={option.value} value={option.value}>
//             {option.text}
//           </option>
//         ))}
//       </select>
// </div>
//       <button className="reset" onClick={() => navigateProducts()}>
//         {" "}
//         Reset Fields
//       </button>
//       </div>

//       <div className="row text-center row-gap-5">
//         {data?.products.length > 0 && data?.page != 0 ? (
//           data.products.map((product, index) => {
//             return (
//               <div className="col-lg-6 product-itemm vh-100 " key={index}>
//                 <h2 className="mb-5 text-black fs-6">{product.name}</h2>
//                 <div className="imgContainerr">
//                   <img src={product.mainImage.secure_url} className="h-100" />
//                 </div>
//                 {/* <div className='price bg-success w-25 h-25'> */}
//                 <h2 className="mb-5 text-black fs-6">{product.price}</h2>
//                 {/* </div> */}
//                 <div className="details d-flex text-align-center justify-content-center mt-3">
//                   <Link
//                     className="product-details"
//                     to={`/products/${product._id}`}
//                   >
//                     details
//                   </Link>
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <h2> no products</h2>
//         )}
//       </div>

//       <nav className="text-center m-auto d-flex justify-content-center mt-3">
//         <ul className="pagination m-auto">
//           <li className="page-item">
//             <Link
//               className="page-link"
//               style={{ pointerEvents: page == 1 ? "none" : "" }}
//               onClick={(e) => getProducts_previous(e)}
//             >
//               Previous
//             </Link>
//           </li>
//           {limit==8? (
          
//             <li className="page-item">
//               <Link className="page-link" to="">
//                 1
//               </Link>
//             </li>
//           ) : (
//             Array.from({ length: data?.total / data?.page }).map((_, index) => {
//               return (
//                 <li className="page-item" key={index}>
//                   <Link
//                     className="page-link"
//                     to={`/products?page=${index + 1}&sort=${sort}`}
//                   >
//                     {index + 1}
//                   </Link>
//                 </li>
//               );
//             })
//           )}
//           <li className="page-item">
//             <Link
//               className="page-link"
//               style={{
//                 pointerEvents:
//                   page == data?.total / data || search?.page ? "none" : "",
//               }}
//               onClick={(e) => getProducts_next(e)}
//             >
//               Next
//             </Link>
//           </li>
//         </ul>
//       </nav>
//     </div>
//     </div>
//   );
// }





console.log(
  ((Math.round(product.avgRating))-0.5)
)

(Math.round(product.avgRating*2)/2);