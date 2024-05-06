import { useEffect, useState } from "react";
import Spinner from "../Spinner";
import swal from "sweetalert";
import {
  addCategories,
  deleteCategories,
  getCategories,
  //updateCategories,
  updateCategory,
} from "../../utils/endPoint";
import { AiOutlineDelete } from "react-icons/ai";
//import { Button } from "@mui/material";
//import { IoMdAddCircle } from "react-icons/io";

type Props = {};

function AdminCategoriesList({}: Props) {
  const [categories, setCategories] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  useEffect(() => {
    fetchCategories();
  }, []);
  const fetchCategories = async () => {
    const { success, data, error } = await getCategories();
    if (!success) {
      swal(error.message, { icon: "error" });
    } else {
      console.log(data?.categories);
      setCategories(data?.categories);
      //swal(data.message, { icon: "success" });
    }
  };
  const handleCategoryNameChange = (id: any, value: string) => {
    setCategories((prevCategories: any) =>
      prevCategories.map((category: any) =>
        category._id === id ? { ...category, name: value } : category
      )
    );
  };

  const addNewCategory = async () => {
    if (!newCategoryName.trim()) {
      swal("Category title cannot be empty");
      return;
    }
    setLoading(true);
    const { success, data, error } = await addCategories(newCategoryName);
    setLoading(false);
    if (!success) {
      swal(error.message, { icon: "error" });
    } else {
      setCategories((prevCategories: any) => [...prevCategories, data]);
      setNewCategoryName("");
    }
  };

  const updateCategoryHandler = async (id: any, name: string) => {
    //console.log("Updating category with ID:", id, "and name:", name); // Debugging log
    setLoading(true);
    setCategories(
      categories.map((category: any) =>
        category._id === id ? { ...category, name } : category
      )
    );
    //console.log("Updated categories:", categories); // Debugging log
    const { success, error } = await updateCategory(id, name);
    setLoading(false);
    if (!success) {
      swal(error.message, { icon: "error" });
    } else {
      swal("Category updated successfully", { icon: "success" });
    }
  };

  const deleteCategory = async (id: any) => {
    setCategories((prevCategories: any) =>
      prevCategories.filter((category: any) => category._id !== id)
    );
    const { success, error } = await deleteCategories(id);
    if (success) {
      swal("Category Deleted");
    } else {
      swal("Category Failed to Delete");
    }
  };

  // const update = async () => {
  //   setLoading(true);
  //   const { success, error } = await updateCategories(categories);
  //   setLoading(false);
  //   if (!success) {
  //     swal(error.message, { icon: "error" });
  //   } else {
  //     swal("Categories updated successfully", { icon: "success" });
  //   }
  // };

  // const handleCategoriesAdd = (id: any, value: string) => {
  //   setCategories((prevCategory: any) =>
  //     prevCategory.map((i: any) => (i._id === id ? { ...i, title: value } : i))
  //   );
  // };
  // const newCategoriesHandler = () => {
  //   if (categories[categories.length - 1].title === "") {
  //     swal("Category title cannot be empty");
  //   } else {
  //     setCategories((prevCategory: any) => [...prevCategory, { title: "" }]);
  //   }
  // };
  // console.log(categories);

  // const editCategoriesHandler = async () => {
  //   setLoading(true);
  //   const { success, data, error } = await updateCategories(categories);
  //   setLoading(false);
  //   if (!success) {
  //     swal(error.message, { icon: "error" });
  //   } else {
  //     swal(data.message, { icon: "success" });
  //   }
  // };
  // return (
  //   <>
  //     {/* {loading ? (
  //       <Spinner />
  //     ) : ( */}
  //     <div className="mt-[120px] text-center align-middle justify-center">
  //       <h1 className="text-center text-slate-950">All Categories</h1>
  //       {categories &&
  //         categories.map((item: any, index: number) => {
  //           return (
  //             <div className="p-3">
  //               <div className="flex items-center w-full justify-center">
  //                 <input
  //                   className="shadow appearance-none border border-blue-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  //                   required
  //                   value={item.name}
  //                   onChange={(e) =>
  //                     handleCategoriesAdd(item._id, e.target.value)
  //                   }
  //                   placeholder="Enter Category Title..."
  //                 />
  //                 <AiOutlineDelete
  //                   className="text-black text-[18px] cursor-pointer"
  //                   onClick={() =>
  //                     setCategories((prevCategory: any) =>
  //                       prevCategory.filter((i: any) => i._id !== item._id)
  //                     )
  //                   }
  //                 />
  //               </div>
  //             </div>
  //           );
  //         })}
  //       <br />
  //       <br />
  //       <div className="w-full flex justify-center">
  //         <IoMdAddCircle
  //           className="text-black text-[25px] cursor-pointer"
  //           onClick={newCategoriesHandler}
  //         />
  //       </div>
  //       <div className="bg-custom-500 py-4 flex flex-col md:flex-row justify-end px-4 md:px-10">
  //         <button
  //           className="border rounded-md h-min py-1 font-semibold px-3 duration-300 bg-blue-500 text-white hover:bg-white hover:text-slate-950"
  //           type="button"
  //           onClick={() => {
  //             editCategoriesHandler();
  //           }}
  //         >
  //           Proceed
  //         </button>
  //       </div>
  //     </div>
  //     {/* )} */}
  //   </>
  // );
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="mt-12 mx-auto w-full max-w-screen-md">
          <h1 className="text-center text-xl font-bold mb-6">All Categories</h1>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">
                  Category Name
                </th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category: any) => (
                <tr key={category._id}>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      className="w-full border-none focus:outline-none"
                      value={category.name}
                      onChange={(e) =>
                        handleCategoryNameChange(category._id, e.target.value)
                      }
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2 flex gap-2">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                      onClick={() =>
                        updateCategoryHandler(category._id, category.name)
                      }
                    >
                      Update
                      {/* <AiOutlineEdit /> */}
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      onClick={() => deleteCategory(category._id)}
                    >
                      <AiOutlineDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6 flex gap-2">
            <input
              className="border border-gray-300 px-4 py-2 focus:outline-none flex-grow"
              type="text"
              placeholder="Enter new category name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={addNewCategory}
            >
              Add
            </button>
          </div>
          {/* <button
            className="border rounded-md h-min py-1 font-semibold mt-5 px-3 duration-300 bg-blue-500 text-white hover:bg-white hover:text-slate-950"
            onClick={update}
          >
            Update
          </button> */}
        </div>
      )}
    </>
  );
}

export default AdminCategoriesList;
