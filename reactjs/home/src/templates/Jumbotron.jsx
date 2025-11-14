export default function Jumbotron(props){

    return (
        <>
            <div className="row mt-4">
                <div className="col">
                    <div className="bg-dark text-light p-4 rounded-4">
                        <h1>{props.subject}</h1>
                        <div>{props.detail}</div>
                    </div>
                </div>
            </div>
        </>
    )
}