export default function Box({children, setIsOpen, isOpen}){
    return(
        <div className="box" style={{overflow:"hidden"}}>
            <button className="btn-toggle"
            onClick={()=>setIsOpen((open)=>!open)}>
                {isOpen ? "-" : "+"}
            </button>
            {isOpen && children}
        </div>
    )
}