import "./LoadingScreen.scss"

/**
 * Generate Bar Chart Component
 * @param name - name of the page
 * @returns Bar Component
 */

function LoadingScreen({name}) {
    return (
        <div id="loading">
            <img 
                src="https://cdn.dribbble.com/users/1787505/screenshots/7300251/media/a351d9e0236c03a539181b95faced9e0.gif"
            />
            <p>Loading {name}</p>
        </div>
    );
}

export default LoadingScreen;