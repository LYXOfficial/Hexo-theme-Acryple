
$fileEncoding = "UTF8";

# https://www.manongdao.com/article-846164.html
Function Convert-FromUnixDate ($UnixDate) {
    [timezone]::CurrentTimeZone.ToLocalTime(([datetime]'1/1/1970').AddSeconds($UnixDate))
}

#$OutputEncoding = New-Object -typename System.Text.UTF8Encoding

#[console]::outputencoding=[system.text.encoding]::utf8

#Write-Host("请将本脚本在 Hexo 根目录执行");
#Write-Host("开始更新 updated");

$fileNum = 0;
Get-ChildItem -Path "./source/_posts" -recurse *.md | ForEach-Object -Process{
    $fileNum = $fileNum + 1;
    if ($_ -is [System.IO.FileInfo]) {

        $filePath = $_.FullName;
        Write-Host('{0}. {1}' -f $fileNum, $filePath);
        
        $lineNum = 0; # yaml 格式占据行数
        $yamlStartEndNum = 0;
        $existUpdated = $false;
        $updatedNum = 0;
        $newstreamreader = New-Object System.IO.StreamReader($filePath);
        while (($readeachline = $newstreamreader.ReadLine()) -ne $null) {
            $lineNum = $lineNum + 1;
            $temp = $readeachline -replace " ","" -replace "\n",""
            if ($temp -match "---") {
                $yamlStartEndNum = $yamlStartEndNum + 1;
            }
            if ($readeachline.Contains("updated:")) {
                $existUpdated = $true;
                $updatedNum = $lineNum;
            }
            if ($yamlStartEndNum -ge 2) {
                # yaml end
                break;
            }
        }
        $newstreamreader.Dispose();

        $filedata = Get-Content -Path $filePath -Encoding $fileEncoding;
        $oldYamlStr = $filedata | Select-Object -First $lineNum

        # git log format: https://www.cnblogs.com/ckAng/p/11205055.html https://git-scm.com/docs/git-log
        # 此文件 最后一次 commit 的 Unix时间戳
        $dateUpdated = git log -1 --format='%ct' $filepath
        $dateUpdated = Convert-FromUnixDate $dateUpdated
        $dateUpdated = $dateUpdated.ToString("yyyy-MM-dd HH:mm:ss");
        $newUpdated = "updated: " + $dateUpdated;

        #Write-Host("newUpdated: " + $newUpdated)

        $newYamlStr = ""
        # 注意: yamlStr 是一个数组, 每一个元素为一行字符串
        $tempOldYamlStr = $oldYamlStr;
        if ($existUpdated) {
            #Write-Host($yamlStr[$updatedNum-1])    
            $oldUpdated = $oldYamlStr[$updatedNum-1];
            $tempOldYamlStr[$updatedNum-1] = $oldYamlStr[$updatedNum-1] -replace $oldUpdated,$newUpdated
        }else {
            # 修改 yaml 结束行
            # TODO: 好像取到的这一行不包括 最后的换行符, 导致加一个 换行 反而多了, 不过为了保险, 还是加上一个换行
            $tempOldYamlStr[$lineNum-1] = $newUpdated + $([System.Environment]::NewLine) + "---" + $([System.Environment]::NewLine)
        }
        $newYamlStr = $tempOldYamlStr

        Write-Output $newYamlStr


        $newFiledata = $newYamlStr + $filedata[$lineNum..$filedata.count]
        $newFiledata | Set-Content -Path $filePath -Encoding $fileEncoding

    }
}

#Write-Host("更新 updated 完成");

