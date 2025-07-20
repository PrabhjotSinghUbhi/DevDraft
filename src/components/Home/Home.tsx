import { useEffect, useState } from "react"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "../ui/card"
import { useNavigate } from "react-router"
import type { PostType } from '../../service/crudService'
import CrudService from "../../service/crudService"
import { useSelector } from 'react-redux'
import type { RootState } from '../../store/store'

function Home() {

    const search = useSelector((state: RootState) => state.search)

    const { getAllPosts } = CrudService

    const [posts, setPosts] = useState<PostType[]>([])

    const [filteredPosts, setFilteredPosts] = useState<PostType[]>([])

    useEffect(() => {
        const fetchAllPost = async () => {
            const data = await getAllPosts()
            setPosts(data)
            console.log("data successfully fetched.");
        }
        fetchAllPost()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setFilteredPosts(
            posts.filter((post) => (((post.body).toLowerCase()).includes(search.toLowerCase()) || (post.title.toLowerCase()).includes(search.toLowerCase())))
        )
    }, [search, posts])

    const navigator = useNavigate()

    return (
        (posts.length === 0) ?
            (<section className="flex flex-col justify-center m-20 items-center   mx-auto w-[9/10] max-w-xl min-h-[40vh] px-4 py-6 bg-white rounded-xl shadow-sm">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-4 mb-4">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">No posts yet</h2>
                <p className="text-gray-500 mb-6 text-center">
                    It looks like there are no articles published yet. Start writing to share your knowledge and inspire others!
                </p>

                <button className="cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-200 font-medium "
                    onClick={() => (navigator('./add-post'))}
                >
                    Write your first article
                </button>
            </section>
            ) : (
                <div className="m-5 sm:gap-14 flex flex-wrap gap-4 justify-center">
                    {
                        filteredPosts.reverse().map((post: PostType) => (
                            <Card key={post.id} className="sm:w-sm  bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden mb-6 transition-transform hover:scale-[1.02]">
                                <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
                                    <CardTitle className="text-2xl font-bold text-white mb-1">{post.title}</CardTitle>
                                    <CardDescription className="text-sm text-blue-100 mb-2">{post.datetime}</CardDescription>
                                    <CardAction>
                                        <button
                                            className="bg-white cursor-pointer text-blue-600 font-semibold px-4 py-1 rounded-lg shadow hover:bg-blue-50 transition-all duration-200"
                                            onClick={() => {
                                                navigator(`/post/${post.id}`)
                                            }}
                                        >Read</button>
                                    </CardAction>
                                </CardHeader>
                                <CardContent className="p-6 text-gray-700 text-base leading-relaxed">
                                    {(post.body).slice(0, 100)}<button className="text-blue-700 cursor-pointer" onClick={() => navigator(`/post/${post.id}`)}>....ReadMore</button>
                                </CardContent>
                            </Card>
                        ))
                    }
                </div>
            )
    )
}

export default Home
