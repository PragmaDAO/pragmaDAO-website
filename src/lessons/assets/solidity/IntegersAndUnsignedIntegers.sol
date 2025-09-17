// SPDX-License-Identifier: MIT
pragma solidity ^0.8.29;

contract IntegerBasics {
    // Declare some integer variables here
    uint8 public myUint8;
    int8 public myInt8;
    uint256 public myUint256;
    int256 public myInt256;

    function setValues(uint8 _myUint8, int8 _myInt8) public {
        myUint8 = _myUint8;
        myInt8 = _myInt8;
    }

    function convertUintToInt(uint256 _value) public pure returns (int256) {
        return int256(_value);
    }

    function convertIntToUint(int256 _value) public pure returns (uint256) {
        return uint256(_value);
    }

    // List of constants for different integer types
    // --- Unsigned Integers (uint) ---
    // 8-bit
    uint8 public constant MIN_UINT8 = type(uint8).min; // 0
    uint8 public constant MAX_UINT8 = type(uint8).max; // 255

    // 16-bit
    uint16 public constant MIN_UINT16 = type(uint16).min; // 0
    uint16 public constant MAX_UINT16 = type(uint16).max; // 65535

    // 24-bit
    uint24 public constant MIN_UINT24 = type(uint24).min; // 0
    uint24 public constant MAX_UINT24 = type(uint24).max; // 16777215

    // 32-bit
    uint32 public constant MIN_UINT32 = type(uint32).min; // 0
    uint32 public constant MAX_UINT32 = type(uint32).max; // 4294967295

    // 40-bit
    uint40 public constant MIN_UINT40 = type(uint40).min; // 0
    uint40 public constant MAX_UINT40 = type(uint40).max; // 1099511627775

    // 48-bit
    uint48 public constant MIN_UINT48 = type(uint48).min; // 0
    uint48 public constant MAX_UINT48 = type(uint48).max; // 281474976710655

    // 56-bit
    uint56 public constant MIN_UINT56 = type(uint56).min; // 0
    uint56 public constant MAX_UINT56 = type(uint56).max; // 72057594037927935

    // 64-bit
    uint64 public constant MIN_UINT64 = type(uint64).min; // 0
    uint64 public constant MAX_UINT64 = type(uint64).max; // 18446744073709551615

    // 72-bit
    uint72 public constant MIN_UINT72 = type(uint72).min; // 0
    uint72 public constant MAX_UINT72 = type(uint72).max; // 4722366482869645213695

    // 80-bit
    uint80 public constant MIN_UINT80 = type(uint80).min; // 0
    uint80 public constant MAX_UINT80 = type(uint80).max; // 1208925819614629174706175

    // 88-bit
    uint88 public constant MIN_UINT88 = type(uint88).min; // 0
    uint88 public constant MAX_UINT88 = type(uint88).max; // 309485009821345068724781055

    // 96-bit
    uint96 public constant MIN_UINT96 = type(uint96).min; // 0
    uint96 public constant MAX_UINT96 = type(uint96).max; // 79228162514264337593543950335

    // 104-bit
    uint104 public constant MIN_UINT104 = type(uint104).min; // 0
    uint104 public constant MAX_UINT104 = type(uint104).max; // 20282409603651670423947251286015

    // 112-bit
    uint112 public constant MIN_UINT112 = type(uint112).min; // 0
    uint112 public constant MAX_UINT112 = type(uint112).max; // 5192296858534827628530496329220095

    // 120-bit
    uint120 public constant MIN_UINT120 = type(uint120).min; // 0
    uint120 public constant MAX_UINT120 = type(uint120).max; // 1329227995784915872903807060280344575

    // 128-bit
    uint128 public constant MIN_UINT128 = type(uint128).min; // 0
    uint128 public constant MAX_UINT128 = type(uint128).max; // 340282366920938463463374607431768211455

    // 136-bit
    uint136 public constant MIN_UINT136 = type(uint136).min; // 0
    uint136 public constant MAX_UINT136 = type(uint136).max; // 87112285931760246646623899502532662132735

    // 144-bit
    uint144 public constant MIN_UINT144 = type(uint144).min; // 0
    uint144 public constant MAX_UINT144 = type(uint144).max; // 22300745198530623141535718272648361505980415

    // 152-bit
    uint152 public constant MIN_UINT152 = type(uint152).min; // 0
    uint152 public constant MAX_UINT152 = type(uint152).max; // 5708990770823839524233143877797980545530986495

    // 160-bit
    uint160 public constant MIN_UINT160 = type(uint160).min; // 0
    uint160 public constant MAX_UINT160 = type(uint160).max; // 1461501637330902918203684832716283019655932542975

    // 168-bit
    uint168 public constant MIN_UINT168 = type(uint168).min; // 0
    uint168 public constant MAX_UINT168 = type(uint168).max; // 374144419156711147060143317175368453031918731001855

    // 176-bit
    uint176 public constant MIN_UINT176 = type(uint176).min; // 0
    uint176 public constant MAX_UINT176 = type(uint176).max; // 95780971304118053647396689196894323976171195136475135

    // 184-bit
    uint184 public constant MIN_UINT184 = type(uint184).min; // 0
    uint184 public constant MAX_UINT184 = type(uint184).max; // 24519928653854221733733552434404946937899825954937634815

    // 192-bit
    uint192 public constant MIN_UINT192 = type(uint192).min; // 0
    uint192 public constant MAX_UINT192 = type(uint192).max; // 6277101735386680763835789423207666416102355444464034512895

    // 200-bit
    uint200 public constant MIN_UINT200 = type(uint200).min; // 0
    uint200 public constant MAX_UINT200 = type(uint200).max; // 1606938044258990275541962092341162602522202993782792835301375

    // 208-bit
    uint208 public constant MIN_UINT208 = type(uint208).min; // 0
    uint208 public constant MAX_UINT208 = type(uint208).max; // 411376139330301510538742295639337626245683966408394965837152255

    // 216-bit
    uint216 public constant MIN_UINT216 = type(uint216).min; // 0
    uint216 public constant MAX_UINT216 = type(uint216).max; // 105312291668557186697918027683670432318895095400549111254310977535

    // 224-bit
    uint224 public constant MIN_UINT224 = type(uint224).min; // 0
    uint224 public constant MAX_UINT224 = type(uint224).max; // 26959946667150639794667015087019630673637144422540572481103610249215

    // 232-bit
    uint232 public constant MIN_UINT232 = type(uint232).min; // 0
    uint232 public constant MAX_UINT232 = type(uint232).max; // 6901746346790563787434755862277025452451108972170386555162524223799295

    // 240-bit
    uint240 public constant MIN_UINT240 = type(uint240).min; // 0
    uint240 public constant MAX_UINT240 = type(uint240).max; // 1766847064778384329583297500742918515827483896875618958121606201292619775

    // 248-bit
    uint248 public constant MIN_UINT248 = type(uint248).min; // 0
    uint248 public constant MAX_UINT248 = type(uint248).max; // 452312848583266388373324160190187140051835877600158453279131187530910662655

    // 256-bit
    uint256 public constant MIN_UINT256 = type(uint256).min; // 0
    uint256 public constant MAX_UINT256 = type(uint256).max; // 115792089237316195423570985008687907853269984665640564039457584007913129639935

    // --- Signed Integers (int) ---
    // 8-bit
    int8 public constant MIN_INT8 = type(int8).min; // -128
    int8 public constant MAX_INT8 = type(int8).max; // 127

    // 16-bit
    int16 public constant MIN_INT16 = type(int16).min; // -32768
    int16 public constant MAX_INT16 = type(int16).max; // 32767

    // 24-bit
    int24 public constant MIN_INT24 = type(int24).min; // -8388608
    int24 public constant MAX_INT24 = type(int24).max; // 8388607

    // 32-bit
    int32 public constant MIN_INT32 = type(int32).min; // -2147483648
    int32 public constant MAX_INT32 = type(int32).max; // 2147483647

    // 40-bit
    int40 public constant MIN_INT40 = type(int40).min; // -549755813888
    int40 public constant MAX_INT40 = type(int40).max; // 549755813887

    // 48-bit
    int48 public constant MIN_INT48 = type(int48).min; // -140737488355328
    int48 public constant MAX_INT48 = type(int48).max; // 140737488355327

    // 56-bit
    int56 public constant MIN_INT56 = type(int56).min; // -36028797018963968
    int56 public constant MAX_INT56 = type(int56).max; // 36028797018963967

    // 64-bit
    int64 public constant MIN_INT64 = type(int64).min; // -9223372036854775808
    int64 public constant MAX_INT64 = type(int64).max; // 9223372036854775807

    // 72-bit
    int72 public constant MIN_INT72 = type(int72).min; // -2361183241434822606848
    int72 public constant MAX_INT72 = type(int72).max; // 2361183241434822606847

    // 80-bit
    int80 public constant MIN_INT80 = type(int80).min; // -604462909807314587353088
    int80 public constant MAX_INT80 = type(int80).max; // 604462909807314587353087

    // 88-bit
    int88 public constant MIN_INT88 = type(int88).min; // -154742504910672534362390528
    int88 public constant MAX_INT88 = type(int88).max; // 154742504910672534362390527

    // 96-bit
    int96 public constant MIN_INT96 = type(int96).min; // -39614081257132168796771975168
    int96 public constant MAX_INT96 = type(int96).max; // 39614081257132168796771975167

    // 104-bit
    int104 public constant MIN_INT104 = type(int104).min; // -10141204801825835211973625643008
    int104 public constant MAX_INT104 = type(int104).max; // 10141204801825835211973625643007

    // 112-bit
    int112 public constant MIN_INT112 = type(int112).min; // -2596148429267413814265248164610048
    int112 public constant MAX_INT112 = type(int112).max; // 2596148429267413814265248164610047

    // 120-bit
    int120 public constant MIN_INT120 = type(int120).min; // -664613997892457936451903530140172288
    int120 public constant MAX_INT120 = type(int120).max; // 664613997892457936451903530140172287

    // 128-bit
    int128 public constant MIN_INT128 = type(int128).min; // -170141183460469231731687303715884105728
    int128 public constant MAX_INT128 = type(int128).max; // 170141183460469231731687303715884105727

    // 136-bit
    int136 public constant MIN_INT136 = type(int136).min; // -43556142965880123323311949751266331066368
    int136 public constant MAX_INT136 = type(int136).max; // 43556142965880123323311949751266331066367

    // 144-bit
    int144 public constant MIN_INT144 = type(int144).min; // -11150372599265311570767859136324180752990208
    int144 public constant MAX_INT144 = type(int144).max; // 11150372599265311570767859136324180752990207

    // 152-bit
    int152 public constant MIN_INT152 = type(int152).min; // -2854495385411919762116571938898990272765493248
    int152 public constant MAX_INT152 = type(int152).max; // 2854495385411919762116571938898990272765493247

    // 160-bit
    int160 public constant MIN_INT160 = type(int160).min; // -730750818665451459101842416358141509827966271488
    int160 public constant MAX_INT160 = type(int160).max; // 730750818665451459101842416358141509827966271487

    // 168-bit
    int168 public constant MIN_INT168 = type(int168).min; // -187072209578355573530071658587684226515959365500928
    int168 public constant MAX_INT168 = type(int168).max; // 187072209578355573530071658587684226515959365500927

    // 176-bit
    int176 public constant MIN_INT176 = type(int176).min; // -47890485652059026823698344598447161988085597568237568
    int176 public constant MAX_INT176 = type(int176).max; // 47890485652059026823698344598447161988085597568237567

    // 184-bit
    int184 public constant MIN_INT184 = type(int184).min; // -12259964326927110866866776217202473468949912977468817408
    int184 public constant MAX_INT184 = type(int184).max; // 12259964326927110866866776217202473468949912977468817407

    // 192-bit
    int192 public constant MIN_INT192 = type(int192).min; // -3138550867693340381917894711603833208051177722232017256448
    int192 public constant MAX_INT192 = type(int192).max; // 3138550867693340381917894711603833208051177722232017256447

    // 200-bit
    int200 public constant MIN_INT200 = type(int200).min; // -803469022129495137770981046170581301261101496891396417650688
    int200 public constant MAX_INT200 = type(int200).max; // 803469022129495137770981046170581301261101496891396417650687

    // 208-bit
    int208 public constant MIN_INT208 = type(int208).min; // -205688069665150755269371147819668813122841983204197482918576128
    int208 public constant MAX_INT208 = type(int208).max; // 205688069665150755269371147819668813122841983204197482918576127

    // 216-bit
    int216 public constant MIN_INT216 = type(int216).min; // -52656145834278593348959013841835216159447547700274555627155488768
    int216 public constant MAX_INT216 = type(int216).max; // 52656145834278593348959013841835216159447547700274555627155488767

    // 224-bit
    int224 public constant MIN_INT224 = type(int224).min; // -26959946667150639794667015087019630673637144422540572481103610249216
    int224 public constant MAX_INT224 = type(int224).max; // 26959946667150639794667015087019630673637144422540572481103610249215

    // 232-bit
    int232 public constant MIN_INT232 = type(int232).min; // -6901746346790563787434755862277025452451108972170386555162524223799296
    int232 public constant MAX_INT232 = type(int232).max; // 6901746346790563787434755862277025452451108972170386555162524223799295

    // 240-bit
    int240 public constant MIN_INT240 = type(int240).min; // -1766847064778384329583297500742918515827483896875618958121606201292619776
    int240 public constant MAX_INT240 = type(int240).max; // 1766847064778384329583297500742918515827483896875618958121606201292619775

    // 248-bit
    int248 public constant MIN_INT248 = type(int248).min; // -452312848583266388373324160190187140051835877600158453279131187530910662656
    int248 public constant MAX_INT248 = type(int248).max; // 452312848583266388373324160190187140051835877600158453279131187530910662655

    // 256-bit
    int256 public constant MIN_INT256 = type(int256).min; // -115792089237316195423570985008687907853269984665640564039457584007913129639936
    int256 public constant MAX_INT256 = type(int256).max; // 115792089237316195423570985008687907853269984665640564039457584007913129639935
}
