# Next Todo APP

## In this Project
- Create todo (POST)
- Read todo (GET)
- Update todo (PATCH)
- Delete todo (DELETE)


## Getting Started

First, install npm packages:

```bash
npm install
# or
yarn
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.




## API

**Create Todo**

    POST /api/todos

| Parameter | Type     | Description              |
| :-------- | :------- | :----------------------- |
| `title`   | `string` | **Required**. Todo Title |

**CURL Example:**

    curl -X POST http://localhost:3000/api/todos
           -H 'Content-Type: application/json'
           -d '{ "title": "Example Todo 1"}'

**Response**

```javascript
{
	"id" : number,
	"title" : string,
	"checked" : bool,
	"pinned" : bool
}
```

---

**Get Todo List**

    GET /api/todos

**CURL Example:**

    curl -X GET http://localhost:3000/api/todos

**Response**

```javascript
[
	{
		id: number,
		title: string,
		checked: bool,
		pinned: bool,
	},
	{
		id: number,
		title: string,
		checked: bool,
		pinned: bool,
	},
]
```

---

**Get Todo Detail**

    GET /api/todos/:id

**CURL Example:**

    curl -X GET http://localhost:3000/api/todos/1652861603540

---

**Update Todo**

    PATCH /api/todos/:id

**CURL Example:**

    curl -X PATCH http://localhost:3000/api/todos/1652861603540
           -H 'Content-Type: application/json'
           -d '{ "title": "Example Todo Updated" }'

---

**Delete Todo**

    DELETE /api/todos/:id


**CURL Example:**

    curl -X DELETE http://localhost:3000/api/todos/1652861603540
