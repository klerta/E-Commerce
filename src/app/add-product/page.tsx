import FormSubmitButton from "@/components/FormSubmitButton";
import prisma from "@/lib/db/prisma";
import { redirect } from "next/navigation";

export const metadata = {

    title: "Add Product - Flowmazon"
}

async function addProduct(formData: FormData){
"use server"

const name = formData.get("name")?.toString();
const description = formData.get("description")?.toString();
const imageUrl = formData.get("imageUrl")?.toString();
const price = Number(formData.get("price") || 0 );

if (!name || !description || !imageUrl || !price){

    throw Error("Missing required fields")
}


await prisma.product.create({
    data: {name, description, imageUrl, price}
});

redirect("/");
}

export default function AddProductPage (){

    return(
        <div>
            <h1 className="text-lg mb-3 font-bold">Add Product</h1>
            <form  action={addProduct}>
            <input
                required
                className="input-bordered input mb-3 w-full"
                 name="name"
                 placeholder="Name"
             />
             <textarea
              required
              name="description"
              placeholder="Description"
              className="textarea-bordered textarea mb-3 w-full"
               />
               <input
                required
                 name="imageUrl"
                 placeholder="Image URL"
                 type="url"
                 className="input-bordered input mb-3 w-full"
             />
            <input
                required
                 name="price"
                 placeholder="Price"
                 type="number"
                 className="input-bordered input mb-3 w-full"
             />
             <FormSubmitButton className="btn-block">Add Product</FormSubmitButton>
            </form>
        </div>
    );
}