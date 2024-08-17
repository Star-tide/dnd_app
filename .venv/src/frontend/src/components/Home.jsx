export const Home = () => {
  let user_display_name = localStorage.getItem('user_display_name');
  return (
    <div>Successfully Logged In {user_display_name}!: Home Page</div>
  )
}
