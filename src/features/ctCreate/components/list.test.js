const list = require("./list")
// @ponicode
describe("componentDidMount", () => {
    let inst

    beforeEach(() => {
        inst = new list.default()
    })

    test("0", async () => {
        await inst.componentDidMount()
    })
})
