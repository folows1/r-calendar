interface IListProps {
    responseArray: string[];
}

export default function List({ responseArray }: IListProps) {


    return (
        <div>

            {responseArray.length > 0 && (
                responseArray.map((item, index) => (
                    <p key={index}>{item}</p>
                ))
            )}
        </div>
    )
}