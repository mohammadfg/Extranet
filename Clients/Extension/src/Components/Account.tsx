export default function Account({ displayName }: { displayName: string }) {
  console.log("render")
  return (
    <div className="w-20 bg-gray-100  dark:bg-slate-400 rounded-b-md ml-auto cursor-help" title="coming soon!">
      <span class="text-xs ml-2">
        <img src="./assets/icons/user.svg" class="w-5 inline mb-1" loading="lazy" />
        {displayName}
      </span>
    </div>
  );
}