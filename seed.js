/**
 * 
 * Fisrt import necessary functions 
 * 
 * Craete Asyncronous funcion SeedD
 * 
 * Establish database connection
 * 
 * drop db if it exist
 * 
 * Create a a new band using create function from band.js in data folder
 * 
 * Get returned band id and use it to add album to created band
 * 
 * 
 */

import {dbConnection, closeConnection} from './config/mongoConnection.js';
//import {bandData, albumData } from './data/index.js';
import { moviesData,usersData,reviewsData,commentsData } from './data/index.js';


async function SeedDB(){

    //establish connection to db
    const db = await dbConnection();

    //drop db if already in existence
    await db.dropDatabase();
 
    console.log("Seeding Database ... ");

    try {

        const user = await usersData.createUser("Kyle","Walker","user001","kyle@gmail.com","M","Vegas","Texas",25,"user",`I liked the movie. It had good throwbacks to the first Top Gun movie and was nostalgic to watch. I liked that it added to the characters and their
        stories from the first movie.`,["Superhero","Action","Horror"]);

        //const user1 = await usersData.createUser("Kyle","Walker","user0011","kyle@gmail.com","M","Vegas","Texas",25,"password123","This are my comments as user intro.",["Superhero","Action","Horror"]);

        const creed3 = await moviesData.createMovie("Creed III (2023)","03/03/2023",["Drama","Sport and Recreation"],"Michael B. Jordan",["Bianca Creed","Wood Harris","Phylicia Rashad","Tessa Thompson","Spence Moore II","Ann Najjar"],"http://cps-static.rovicorp.com/2/Open/MGM/Program/48935310/_derived_jpg_q90_584x800_m0/Creed_2x3_27_1677058005284_2.jpg",3.5,13);
       
                       await reviewsData.createReview(creed3.insertedId.toString(),"Creed III (2023)",`Reaping the benefits of his booming career and enjoying his stable family life, boxing sensation Adonis Creed (Michael B. Jordan) feels unstoppable. However, the unexpected return of his childhood friend and former rising boxing star (Jonathan Majors), who took the fall for a petty crime the duo committed years ago, forces Adonis to contend with long-buried demons from his past. Michael B. Jordan makes his directorial debut with the third installment to the boxing franchise. Co-starring Tessa Thompson and Wood Harris.`,
                                                             "English",["Drama","Sport and Recreation"],["Bianca Creed","Wood Harris","Phylicia Rashad","Tessa Thompson","Spence Moore II","Ann Najjar"],"03/03/2023","https://www.imdb.com/title/tt11145118/?ref_=nv_sr_srsg_0_tt_3_nm_5_q_cre","https://www.hollywood.com/movies/movie-ticket-buying-throughout-history-61015488");
 
                  await commentsData.createComment(creed3.insertedId.toString(),"user001","This is my comment on the movie",3.5,["good plot","good action","good acting"]);
                  await commentsData.createComment(creed3.insertedId.toString(),"user001","This is my comment on the movie",3.5,["good plot","good action","good acting"]);
                  await commentsData.createComment(creed3.insertedId.toString(),"user001","This is my comment on the movie",3.5,["good plot","good action","good acting"]);

      
        const dune = await moviesData.createMovie("Dune part 2","11/03/2023",["Action","Drama","Adventure"],"Denis Villeneuve",["Timothée Chalamet","Rebecca Ferguson","Florence Pugh","Tim Blake Nelson","Molly Mcowan","Christopher Walken"],"http://localhost:3000",4,230);

                    await reviewsData.createReview(dune.insertedId.toString(),"Dune part 2",`This follow-up film will explore the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee`,
                                                         "English",["Action","Drama","Adventure"],["Timothée Chalamet","Rebecca Ferguson","Florence Pugh","Tim Blake Nelson","Molly Mcowan","Christopher Walken"],"11/03/2023","https://www.imdb.com/title/tt15239678/?ref_=fn_al_tt_2","https://movietheaterprices.com/amc-ticket-prices/");


       const Fortune = await moviesData.createMovie("Operation Fortune","03/03/2023",["Action","Comedy"],"Guy Ritchie",["Jason Statham","Aubrey Plaza","Cary Elwes","Hugh Grant","Eddie Marsan","Josh Hartnett"],"http://localhost:3000",3.5,230);

                        await reviewsData.createReview(Fortune.insertedId.toString(),"Operation Fortune",`In the film, super spy Orson Fortune (Jason Statham) must track down and stop the sale of a deadly new weapons technology wielded by billionaire arms broker Greg Simmonds (Hugh Grant). Reluctantly teamed with some of the world's best operatives (Aubrey Plaza, Cary Elwes, Bugzy Malone), Fortune and his crew recruit Hollywood's biggest movie star Danny Francesco (Josh Hartnett) to help them on their globe-trotting undercover mission to save the world.`,
                                                             "English",["Action","Comedy"],["Jason Statham","Aubrey Plaza","Cary Elwes","Hugh Grant","Eddie Marsan","Josh Hartnett"],"03/03/2023","https://www.imdb.com/title/tt7985704/?ref_=nv_sr_srsg_0_tt_8_nm_0_q_operation%2520","https://movietheaterprices.com/amc-ticket-prices/");

       const evildead = await moviesData.createMovie("Evil Dead Rise","04/21/2023",["Horror"],"Lee Cronin",["Mirabai Pease","Richard Crouchley","Alyssa Sutherland","Morgan Davies","Gabrielle Echols"],"http://localhost:3000",3.5,230);

                        await reviewsData.createReview(evildead.insertedId.toString(),"Evil Dead Rise",`Moving the action out of the woods and into the city, "Evil Dead Rise" tells a twisted tale of two estranged sisters, played by Sutherland and Sullivan, whose reunion is cut short by the rise of flesh possessing demons, thrusting them into a primal battle for survival as they face the most nightmarish version of family imaginable`,
                                                         "English",["Horror"],["Mirabai Pease","Richard Crouchley","Alyssa Sutherland","Morgan Davies","Gabrielle Echols"],"04/21/2023","https://www.imdb.com/title/tt13345606/?ref_=nv_sr_srsg_0_tt_8_nm_0_q_evil","https://movietheaterprices.com/amc-ticket-prices/");
       
        const memory = await moviesData.createMovie("Memory","03/27/2007",["Action","Horror"],"Bennett Davlin",["Billy Zane","Tricia Helfer","Dennis Hopper","Hailey Shand","Matt Fentiman"],"http://localhost:3000",4,230);

        await reviewsData.createReview(memory.insertedId.toString(),"Memory",`A medical researcher teams with a retired doctor to root around in the genetically stored memories of a serial killer.`,
                                                                   "English",["Action","Horror"],["Billy Zane","Tricia Helfer","Dennis Hopper","Hailey Shand","Matt Fentiman"],"03/27/2007","https://www.imdb.com/title/tt0418879/?ref_=nv_sr_srsg_4_tt_8_nm_0_q_memory","https://movietheaterprices.com/amc-ticket-prices/");
                                    
       const evilResident = await moviesData.createMovie("Resident Evil","03/15/2002",["Horror"],"Paul W.S. Anderson",["Milla Jovovich","Michelle Rodriguez","Oscar Pearce","Joseph May","Robert Tannion","Fiona Glascott"],"http://localhost:3000",3.5,230);

                            await reviewsData.createReview(evilResident.insertedId.toString(),"Resident Evil",`A virus has escaped in a secret facility called "The Hive," turning the staff into hungry zombies and releasing the mutated Lab "Animals" that they were studying. The complex computer shuts down the base to prevent infection. The parent corporation sends in an elite military unit, where they meet Alice, who is suffering from amnesia due to exposure to nerve gas. The military team must shut down the computer and get out, fighting their way past zombies, mutants, and the computer itself, before the virus escapes and infects the rest of the world. Alice must also come to terms with her slowly-returning memories.`,
                                                                 "English",["Horror"],["Milla Jovovich","Michelle Rodriguez","Oscar Pearce","Joseph May","Robert Tannion","Fiona Glascott"],"03/15/2002","https://www.imdb.com/title/tt0120804/?ref_=nv_sr_srsg_0_tt_8_nm_0_q_evil%2520re","https://movietheaterprices.com/amc-ticket-prices/");

       const Endless = await moviesData.createMovie("Endless","08/14/2020",["Drama","Fantasy","Romance"],"Scott Speer",["Alexandra Shipp","Nicholas Hamilton","DeRon Horton","Famke Janssen"],"http://localhost:3000",3.5,230);

                      await reviewsData.createReview(Endless.insertedId.toString(),"Endless",`When madly in love high school graduates Riley (Alexandra Shipp) and Chris (Nicholas Hamilton) are separated by a tragic car accident, Riley blames herself for her boyfriend's death while Chris is stranded in limbo. Miraculously, the two find a way to connect. In a love story that transcends life and death, both Riley and Chris are forced to learn the hardest lesson of all: letting go.`,
                                                            "English",["Drama","Fantasy","Romance"],["Alexandra Shipp","Nicholas Hamilton","DeRon Horton","Famke Janssen"],"08/14/2020","https://www.imdb.com/title/tt5723282/?ref_=nv_sr_srsg_7_tt_8_nm_0_q_endle","https://movietheaterprices.com/amc-ticket-prices/");

                /*    await moviesData.createMovie("movietitle","releasedate",["Action"],"director",["cast"],"http://localhost:3000",3.5,230);

                    await reviewsData.createReview(dune.insertedId.toString(),"movietitle",`movie description`,
                    ["Action","Drama"],["cast"],"realease date","linktomovie","https://movietheaterprices.com/amc-ticket-prices/");

                    await moviesData.createMovie("movietitle","releasedate",["Action"],"director",["cast"],"http://localhost:3000",3.5,230);

                    await reviewsData.createReview(dune.insertedId.toString(),"movietitle",`movie description`,
                    ["Action","Drama"],["cast"],"realease date","linktomovie","https://movietheaterprices.com/amc-ticket-prices/");
                    await moviesData.createMovie("movietitle","releasedate",["Action"],"director",["cast"],"http://localhost:3000",3.5,230);

                    await reviewsData.createReview(dune.insertedId.toString(),"movietitle",`movie description`,
                    ["Action","Drama"],["cast"],"realease date","linktomovie","https://movietheaterprices.com/amc-ticket-prices/");
                    await moviesData.createMovie("movietitle","releasedate",["Action"],"director",["cast"],"http://localhost:3000",3.5,230);

                    await reviewsData.createReview(dune.insertedId.toString(),"movietitle",`movie description`,
                    ["Action","Drama"],["cast"],"realease date","linktomovie","https://movietheaterprices.com/amc-ticket-prices/");
*/

        } catch (error) {

            console.log(error);
            return;

        }

    console.log('Done seeding database');
    await closeConnection();
}

SeedDB();