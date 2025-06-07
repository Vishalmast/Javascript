import React, {useState, useCallback} from "react";

function UserList(){
	const [list, setList] = useState(()=> Array.from({length: 100}, (v, i)=> ({name: "user_" + i, id: i}));
	
	const updateName = useCallback((id, newName) =>{
		setList(prevList => prevList.map((user)=> {
			return user.id === id ? {...user, name: newName} : user;
	}))}, []);
	
	return (
		<>
		{list.map((user, index)=> {
			return (<UserItem name={user.name} id={user.id} key={user.id + index} updateName={updateName}/>
		)})}
		</>
	);
}

const UserItem = React.memo(({name, id, updateName})=>{
	const [newName, setNewName] = useState("");

	
	return (
		<div>
			Name: {name}
			New Name: <input type="text" value={newName} onChange={(e)=>setNewName(e.target.value)} />
			<button onClick={()=> updateName(id, newName)}>Change Name</button>
		</div>
	
	);
});


