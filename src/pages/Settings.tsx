const Settings = () => {
  return (
    <div className="mt-16">
      <form className="border-b-4">
        <h1 className="text-lg font-bold m-4 mt-20">تغيير كلمة المرور:</h1>
        <div className="my-4 px-8">
          <p>كلمة المرور القديمة:</p>
          <input type="password" dir="ltr" className="focus:outline-none p-2 h-10 border-2 rounded-lg w-full mt-2"/>
        </div>
        <div className="my-4 px-8">
          <p>كلمة المرور الجديدة:</p>
          <input type="password" dir="ltr" className="focus:outline-none p-2 h-10 border-2 rounded-lg w-full mt-2"/>
        </div>
        <div className="my-4 px-8">
          <p>تأكيد كلمة المرور الجديدة:</p>
          <input type="password" dir="ltr" className="focus:outline-none p-2 h-10 border-2 rounded-lg w-full mt-2"/>
        </div>
        <div className="flex justify-center items-center my-4">
          <button className="px-4 py-2 rounded-lg bg-green-300">تغيير كلمة المرور</button>
        </div>
      </form>
    </div>
  )
}

export default Settings