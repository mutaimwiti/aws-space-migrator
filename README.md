# mongo-str-replace
Replace string occurrences in MongoDB fields

### Instructions
- Create a backup of the database for safety in case anything goes wrong
- Create a copy of `.env.example` and name it `.env`
- Update the variables in `.env` to match your db, target string and replacement string
- Follow the format of `in/fields.example.json` to create `in/fields.json`
- Carefully specify all the fields on which to perform string replacements

### Input format
The formats below are allowed for the in/fields.json file:
- `<collection>.<field>`
    - `users.email`
    - `clients.warehouse`
- `<collection>.<field>.[depth-1-subfield].[depth-2-subfield].[...]` 
    - `reports.meta.downloads`
    - `articles.magazine.editor.name`

Overall structure

```json
[
    "users.email",
    "clients.warehouse",
    "reports.meta.downloads",
    "articles.magazine.editor.name"
]
```

### Run the application
Ensure everything on `.env` and `in/fields.json` is set up properly.

Install dependencies: 
- Run: `yarn` or `npm install`

Start processing: 
- Run: `yarn start` or `npm start`
