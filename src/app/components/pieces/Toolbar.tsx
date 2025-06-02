import Wrapper from "../layout/Wrapper.tsx";

const Toolbar = () => {
  return (
    <Wrapper>
      <div className="px-[48px]">
        <button className="flex gap-4 hover:opacity-80 text-primary-400 font-medium border border-primary-400 px-[18px] py-[8px] rounded-full cursor-pointer transition-colors duration-150">
          <span className="scale-175 origin-center relative -top-[3px]">+</span>
          <span>New Message</span>
        </button>
      </div>
    </Wrapper>
  )
}

export default Toolbar;