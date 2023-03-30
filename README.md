## 💡Project name: 
![image](https://i.postimg.cc/T1qFMT41/Rectangle-143.png)

**Biblioteca de les coses**

Biblioteca de les coses
 
## 📝Project description:

Encourage the community use of unusual objects and tools by the residents of the municipality. The Cosatheque project tries to move what would be a normal library to a library with articles. The main objective is to focus on the role of administrator (librarian) can do CRUD of Articles, Users, and Loans. In the future the user will also be able to book. The secondary objective is that also a Registered User can see what items are available..

## 📸Screenshots:

| Figma | Trello | Demor |
| :---: | :---: | :---: |
|<img src="https://i.postimg.cc/KcBKyr24/mockup.png" width="50%"> |<img src="https://i.postimg.cc/cJPQFxQz/trello.png" width="50%"> | <img src="https://i.postimg.cc/x1vWwVLp/localhost-5173.png" width="50%"> |

		

## 🔧Stacks:

## Technologies

 <p align="center">
 <img src= "https://img.shields.io/badge/typescript-%23E70F89.svg?style=for-the-badge&logo=typescript&logoColor=white"></img>
 <img src= "https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"></img>
 <img src= "https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white"></img> 
 <img src= "https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"></img> 
 <img src= "https://img.shields.io/badge/mysql-2DA98F?style=for-the-badge&logo=mysql&logoColor=white"></img>
 </p>
 
 ## Tools

 <p align="center"><a herf="https://www.figma.com/file/j3PmBXAYaB5q9chh5o23tw/Quotes?node-id=0%3A1&t=wIPAO9j1BXSjwg2G-0"><img src= "https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white"></a>
 <a href=""><img src= "https://img.shields.io/badge/Github-%2300C4CC.svg?style=for-the-badge&logo=Canva&logoColor=white"></a>
 <a herf="https://trello.com/b/MEFwJ2xu/frases"><img src= "https://img.shields.io/badge/Trello-%23026AA7.svg?style=for-the-badge&logo=Trello&logoColor=white"></img>

## 👩‍💻Group members:

+ Joel Herrero https://github.com/letjoel **Product Owner**
+ Freddy Vegas https://github.com/Reoobot **Scrum Master**
+ Fabio Migliaccio https://github.com/FabioMigliacc Developer
+ Daniel Useche https://github.com/usechedaniel88 Developer

## 💻How to install this project

1. Clone the project
```bash
 git clone https://github.com/cosateca/cosatk-front.git
```
2. Start command
```
 npm i
```
3. 
```
Run the npm start command to run the React app. It will automatically open the localhost ( http://localhost:5173 )
```

## 📚Methodology:
- Methodology Agile with Scrum.
- Mob Programming.
- Pair Programming.
- TDD.

## 👀 TEST
	
![image](https://i.postimg.cc/YCyX0QJF/testcapturefront.png)

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```



## 🧪Next Steps:
	+ Change password the user himself
	+ Hardcoded colors
	+ When an article or user is deleted, the data of the article or user is kept in the rows of loans that at some point they used. This requires adding new fields to the loan table in which the item and user name are saved.
	+ Instead of deleting the items these could stay in the registry, you can add a field is_active
    + When modifying an article you can modify the image
    + When modifying an article you can modify shown_on_web
    + Loans counter on each article
    + Ability to add multiple images
    + Possibility to add multiple categories
    + Sending emails: registration, courtesy notice, password recovery.
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```






