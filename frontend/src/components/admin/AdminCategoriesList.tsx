import { useEffect, useState } from "react";
import Spinner from "../Spinner";
import swal from "sweetalert";
import {
  addCategories,
  deleteCategories,
  getCategories,
  updateCategory,
} from "../../utils/endPoint";
import { AiOutlineDelete } from "react-icons/ai";

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
    setLoading(true);
    setCategories(
      categories.map((category: any) =>
        category._id === id ? { ...category, name } : category
      )
    );
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
      console.log(error.message);
    }
  };

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
