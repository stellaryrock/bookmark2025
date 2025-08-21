export default function Withdrawl(){

  return (
    <>
      <form action="" className="">
        <div className="flex flex-col">
          <label>
            <input type="radio" name="option" value="A" />탈퇴 사유 1
          </label>
          <label>
            <input type="radio" name="option" value="B" />탈퇴 사유 2
          </label>
          <label>
            <input type="radio" name="option" value="C" />탈퇴 사유 3
          </label>
        </div>

        <div className="flex justify-center items-center gap-6">
          <label>
            <input type="checkbox" />탈퇴 동의
          </label>
          <button type='submit' className="border-2 p-2 rounded-md text-red">
            회원 탈퇴
          </button>
        </div>
      </form>
    </>
  )
}