import { useState,useEffect } from 'react'
import './App.css'
const getLocalstorage = () => {
  let list = localStorage.getItem('list');
  if(list){
    return(list = JSON.parse(localStorage.getItem('list')));
  }else {
    return[];
  }
};
function App() {
  
  const [name,setName] = useState('');
  const [list,setList] = useState(getLocalstorage());

  const [isEditing, setIsEditing] = useState(false);
  const [editId,setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name) {
      console.log('name false');
    }else if (name && isEditing){
      setList(
        list.map((item) =>{
          if(item.id === editId){
            return{...item,title: name}
          }
          return item
        })
      )
      setName('');
      setEditId(null)
      setIsEditing(false);
    }else {
      const newItem = {
        id: new Date().getItem().toString(),
        title: name,
      }
      setList([...list,newItem]);
      setName('')
      console.log('added');
    }
  }

  const removItem = (id) => {
    const newItem = list.filter((item) => item.id !== id)
    setList(newItem)
  }
  const editItem = (id) => {
    const newItem = list.find((item) => item.id === id);
    setIsEditing(true)
    setEditId(id);
    setName(newItem.title)
  }

  useEffect(() => {
    localStorage.setItem('list',JSON.stringify(list));
  },[list]);
  return (
    <div className="App">
         <section className='section-center'>
          <form action="" className='grocery-form' onSubmit={handleSubmit}>
            <h3>form</h3>
            <input type="text"
            value={name}
            className='grocery'
            placeholder='todo'
            onChange={(e) => setName(e.target.value)}
            />
            <button>
              {isEditing ? 'edit' : 'submit'}
            </button>
          </form>
          <div>
            {list.map((item) =>{
              return(
                <div key={item.id}>
                  <h2> {item.title} </h2>
                  <button onClick={() => editItem(item.id)}>edit</button>
                  <button onClick={()=> removItem(item.id)}>delete</button>
                </div>
              )
            })}
          </div>
         </section>
        
     
    </div>
  )
}

export default App
