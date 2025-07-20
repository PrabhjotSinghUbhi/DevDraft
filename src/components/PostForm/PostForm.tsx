
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { nanoid } from "@reduxjs/toolkit";
import CrudService from "../../service/crudService";
import { useNavigate } from "react-router";

type PostFormValues = {
    title: string;
    body: string;
};

function PostForm() {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<PostFormValues>();

    // const [post, setPost] = useState<PostType>()
    // const [post, setPost] = useState()

    const navigator = useNavigate()

    const submitHandler = async (data: PostFormValues) => {
        const post = { id: nanoid(), datetime: (new Date().toUTCString()), ...data }
        console.log(post)
        CrudService.postRequest(post)
        reset();
        navigator("/")
    };

    return (
        <Card className="sm:max-w-xl m-5 sm:w-full sm:mx-auto  bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden mt-8 mb-8">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl">
                <CardTitle className="text-2xl font-bold text-white">Create a New Post</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
                <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Title</label>
                        <Input
                            {...register("title", { required: "Title is required" })}
                            placeholder="Post title"
                            className="w-full"
                        />
                        {errors.title && (
                            <span className="text-red-500 text-sm mt-1 block">{errors.title.message}</span>
                        )}
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Body</label>
                        <Textarea
                            {...register("body", { required: "Body is required" })}
                            placeholder="Write your post here..."
                            rows={6}
                            className="w-full"
                        />
                        {errors.body && (
                            <span className="text-red-500 text-sm mt-1 block">{errors.body.message}</span>
                        )}
                    </div>
                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-200 font-medium cursor-pointer"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Publish Post"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

export default PostForm;
