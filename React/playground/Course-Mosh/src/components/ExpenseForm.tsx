<form onSubmit={handleSubmit(onSubmit)}>
  <div className="mb-3">
    <label htmlFor="" className="form-label">
      Description
    </label>
    <input {...register("description")} id="description" className="form-control" type="text" />
  </div>
  <div className="mb-3">
    <label htmlFor="" className="form-label">
      Amount
    </label>
    <input {...register("amount")} className="form-control" type="number" />
  </div>
  <div className="mb-3">
    <label htmlFor="" className="form-label">
      Category
    </label>
    <select {...register("category")} className="form-select">
      <option value="1">Groceries</option>
      <option value="2">Utilities</option>
      <option value="3">Entertainment</option>
    </select>
  </div>
  <button className="btn btn-primary">Submit</button>
</form>;
