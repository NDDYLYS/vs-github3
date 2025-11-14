export default function Jumbotron({subject = "제목", detail = ""}){

    return (
        <>
            <div className="row mt-4">
                <div className="col">
                    <div className="bg-dark text-light p-4 rounded-4">
                        <h1>{subject}</h1>
                        <div>{detail}</div>
                    </div>
                </div>
            </div>
        </>
    )
}