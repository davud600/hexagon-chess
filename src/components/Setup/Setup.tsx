

interface SetupProps
{
    currentUser: string
}
const Setup = ({currentUser}: SetupProps) =>
{
    return(
        <>
        <span>{currentUser}</span>
        </>
    )
}

export default Setup;