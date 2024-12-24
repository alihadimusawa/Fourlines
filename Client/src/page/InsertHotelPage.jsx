import styling from "../style/AdminPage.module.css";

export default function InsertHotelPage() {
  const ratingOptions = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
  const booleanOptions = [
    { value: true, label: "true" },
    { value: false, label: "false" },
  ];

  return (
    <div className={styling.insertHotelPage}>
      <h1>INSERT HOTEL</h1>

      <form action="POST">
        <h5>Nama Hotel</h5>
        <input type="text" name="name" id="name" />

        <h5>Alamat</h5>
        <input type="text" name="alamat" id="alamat" />

        <h5>Deskripsi hotel</h5>
        <textarea id="deskripsi" name="deskripsi" rows="10" cols="50" />

        <div className={styling.inputContainer}>
          <div>
            <h5>Rating</h5>
            <input type="number" name="rating" step="0.5" min="1" max="5" />
          </div>

          <div>
            <h5>Kamar</h5>
            <input type="number" name="kamar" min="0" />
          </div>

          <div>
            <h5>Jarak</h5>
            <input type="number" name="jarak" min="0" />
          </div>

          <div>
            <h5>Allotment</h5>
            <select name="allotment">
              {booleanOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h5>Special</h5>
            <select name="special">
              {booleanOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h5>Restaurant</h5>
            <select name="restaurant">
              {booleanOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styling.inputContainer}>
          <div>
            <h5>Gym</h5>
            <select name="gym">
              {booleanOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h5>Laundry</h5>
            <select name="laundry">
              {booleanOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h5>Cafe</h5>
            <select name="cafe">
              {booleanOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h5>Wifi</h5>
            <select name="wifi">
              {booleanOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h5>Breakfast</h5>
            <select name="breakfast">
              {booleanOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h5>Pool</h5>
            <select name="pool">
              {booleanOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <form action="POST" id={styling.imageForm}>
          <h5>Add Image</h5>
          <table>
            <thead>
              <tr>
                <th id={styling.linkContainer}>Link Gambar</th>
                <th>Manage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td id={styling.linkContainer}>Contoh Link</td>
                <td id={styling.imageFormManage}>
                  <button className={styling.editButton}>EDIT</button>
                  <button
                    className={styling.deleteButton}
                    onClick={() => deleteHotels(hotel.hotel_id)}
                  >
                    DELETE
                  </button>

                </td>
              </tr>
            </tbody>
          </table>

          <button className={styling.addButton}>ADD IMAGE</button>
        </form>

        <form action="POST" id={styling.priceForm}>
          <table>
            <thead>
              <tr>
                <th>Mulai</th>
                <th>Akhir</th>
                <th>Double</th>
                <th>Triple</th>
                <th>Quad</th>
                <th>Quint</th>
                <th>Manage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="date" name="start_date" />
                </td>
                <td>
                  <input type="date" name="end_date" />
                </td>
                <td>
                  <input type="number" name="double_price" step="1" min="0" />
                </td>
                <td>
                  <input type="number" name="triple_price" step="1" min="0" />
                </td>
                <td>
                  <input type="number" name="quad_price" step="1" min="0" />
                </td>
                <td>
                  <input type="number" name="quint_price" step="1" min="0" />
                </td>
                <td id={styling.manageButtonContainer}>
                  <button className={styling.editButton}>EDIT</button>
                  <button
                    className={styling.deleteButton}
                    onClick={() => deleteHotels(hotel.hotel_id)}
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <button className={styling.addButton}>CONFIRM</button>
        </form>
      </form>
    </div>
  );
}
