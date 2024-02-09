import { v4 as uuidV4 } from "uuid";
import { hash } from "bcrypt";
import createConnection from "../index";

//Comando criar o seed de admn yarnpkg seed:admin
async function create(){
    const connection = await createConnection("localhost");
    const id = uuidV4();
    const password = await hash("adm%1234", 8);


    await connection.query(
    `INSERT INTO users 
        VALUES ( 
            '${id}',
            'Luiz Fernando',
            'Rua 1',
            '62',
            '08191613654',
            'Crispim Santana',
            'Masculino',
            '(38) 9 99888298',
            true,
            'Programador',
            'admin@gmail.com',
            '${password}',
            true,
            'now()}'
        )`
    );

    await connection.close;
    
}

create().then(() => console.log("User admin created!"));