export interface PostType {
    id: string,
    title: string,
    datetime: string,
    body: string
}

class CrudServices {

    base_url = "http://localhost:4000/posts"

    async getAllPosts() {
        try {
            const resp = await fetch("http://localhost:4001/posts")
            if (!resp.ok) {
                throw new Error("Error in Fetching data.")
            }
            const data = await resp.json()
            console.log("Successfully Fetched via crud Services:", data)
            return data;
        } catch (err) {
            console.log('====================================')
            console.log("Some Error occurred", err)
            console.log('====================================')
            return [];
        }
    }

    postRequest(post: PostType) {
        fetch("http://localhost:4001/posts", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        })
            .then(resp => {
                if (!resp.ok) {
                    throw new Error('Failed to Post')
                }
                return resp.json()
            })
            .then(resp => {
                console.log("Posted:", resp)
            })
            .catch(err => console.log(err))
    }

    async deleteRequest(id: string) {
        try {
            await fetch(`http://localhost:4001/posts/${id}`, {
                method: "DELETE"
            })
        } catch (err) {
            console.log("Error in Deletion.", err);
        }
    }

    async getPost(id: string) {
        try {
            const resp = await fetch(`http://localhost:4001/posts/${id}`)
            if (!resp.ok) {
                throw new Error("Error in fetching the post.")
            }
            const data = await resp.json()
            console.log('Successfully got the data:', data)
            return data;
        } catch (err) {
            console.log("some error occurred", err);
        }
    }

    async updatePost(id: string, title: string, body: string) {
        try {
            const resp = await fetch(`http://localhost:4001/posts/${id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: title, body: body })
            })
            if (!resp.ok) {
                throw new Error("Error in fetching the post.")
            }
            const data = await resp.json()
            console.log('Successfully got the data:', data)
            return data;
        } catch (err) {
            console.log("some error occurred", err);
        }
    }
}

const CrudService = new CrudServices
export default CrudService