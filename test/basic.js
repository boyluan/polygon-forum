const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Comments", function () {
  it("Should add and fetch successfully", async function () {
    const Comments = await ethers.getContractFactory("Comments");
    const comments = await Comments.deploy();
    await comments.deployed();

    expect(await comments.getComments("my-first-blog-post")).to.be.lengthOf(0);

    const tx1 = await comments.addComment(
      "my-first-blog-post",
      "my first comment"
    );
    await tx1.wait();

    expect(await comments.getComments("my-first-blog-post")).to.be.lengthOf(1);
    expect(await comments.getComments("my-second-blog-post")).to.be.lengthOf(0);

    const tx2 = await comments.addComment(
      "my-second-blog-post",
      "this comment is on a different thread"
    );
    await tx2.wait();

    expect(await comments.getComments("my-first-blog-post")).to.be.lengthOf(1);
    expect(await comments.getComments("my-second-blog-post")).to.be.lengthOf(1);
  });

  // ## Notes
  // The above test cover a process of fetching and adding comments to distinct topics

  // We first fetch comments for 'my-first-blog-post' and we can expect none to exist (contd. below)
  // Since we've not yet added any comments to this topic
  // Thus a natural next step is to try adding a comment

  // When we add a comment > We 'await' the function > And are returned a transaction
  // But this does not mean that our comment was successfully added
  // We then have to 'await' the transaction ⬇
  // In order to be certain that our comment was mined, and persisted to the blockchain

  // After we are certain that it's been mined, we again fetch the list of comments for 'my-first-blog-post'
  // And we now expect there to be a single comment

  // Since it's smart to fetch comments for a different topic ⬇
  // And make sure that the comments we just posted, aren't somehow showing up for other topics
  // So we fetch comments for 'my-second-blog-post' and expect there to be 0

  // From there, we repeat the process, as laid out above
  // This time, adding a comment to 'my-second-blog-post'
  // And again, ensuring that the number of comments for each topic looks appropriate

});