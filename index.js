/*jshint esversion: 8*/

const _ = console.log;


class createIndexedDB{
    
    constructor(nameDatabase){
        this.nameDatabase = nameDatabase;
    }
    createDatabase(){
        const request = indexedDB.open(this.nameDatabase);
        request.onerror = (event)=>{
            const {code, message, name} = event.target.error;
            console.log(`Error code: ${code}\nName: ${name}\n${message}`);
        };
        request.onsuccess = (event)=>{            
            const database = event.target.result;
            database.close();            
        };
    }
    createStore(nameStore,key,indexSettings){
        const request = indexedDB.open(this.nameDatabase);
        
        request.onsuccess = (event)=>{

            _('primer success');
            const database = event.target.result;
            const version = database.version + 1;
            database.close();
            _(version);
            const requestToChange = indexedDB.open(this.nameDatabase, version);
            requestToChange.onerror = (event)=>{
                const {code, message, name} = event.target.error;
                console.log(`Error code: ${code}\nName: ${name}\n${message}`);
            };
            requestToChange.onupgradeneeded = (event)=>{
                const database = event.target.result;
                const objectStore = database.transaction(this.nameDatabase).objectStore(nameStore);
                _(objectStore);
                // const objStore = database.createObjectStore(nameStore,{keyPath:key});
                // for( const index of indexSettings){
                //     const {name, field, unique } = index;
                //     objStore.createIndex(name,field,{unique:unique});
                // }
                
                _('entro upgrade');
            };
            requestToChange.onsuccess = (event)=>{
                const database = event.target.result;
                database.close();
                _('segundo success');
            };
        };        
    }   
}

const miDatabase = new createIndexedDB('Databsssadfdfses');


const indexSettings = [
    {name:'findCodigo',field:'codigo',unique:true},
    {name:'findNombre',field:'nombre',unique:false},
    {name:'findTelefono',field:'telefono',unique:false},
];
miDatabase.createDatabase();
miDatabase.createStore('users','codigo',indexSettings);
// _(miDatabase.currentVersion());
// miDatabase.createStore('usuarios','codigo',indexSettings);