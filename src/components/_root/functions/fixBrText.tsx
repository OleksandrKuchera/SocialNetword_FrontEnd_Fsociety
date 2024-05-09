interface FixBrComponentProps {
    text: string;
}

const FixBrComponent = ({text} : FixBrComponentProps) => {
    return (
        <p>
            {text.split('</br>').map((text, index) => (
                <p key={index}>
                    {text}
                    {index !== text.split('</br>').length - 1 && <br/>}
                </p>
            ))}
        </p>
    );
};

export default FixBrComponent;